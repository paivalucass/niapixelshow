import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import expect from 'expect'
import { firestoreDB } from '../../src/services/firebase/firebaseAdmin';
import { Stats } from 'fs';
import { any, string } from 'zod';

const feature = loadFeature('tests/features/payment.feature');

defineFeature(feature, (test)=>{
    let request = supertest(app)
    let response: supertest.Response;
    jest.setTimeout(15000);

    async function clearDatabase(){
        const orders = await firestoreDB.collection('orders').get();
        const batch = firestoreDB.batch();
        orders.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
    }

    beforeAll(async () => {
        await clearDatabase();
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    afterAll(async () => {
        await clearDatabase();
    });

    test('Marcar o pedido como pago ao confirmar pagamento', ({given, when, then}) => {
        given(/^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            }
            response = await request.post('/order').send(orderData);
        });
        when('o pedido é confirmado', async () => {
            const id = response.body.id;
            const orderData = {
                status: "Pago"
            }
            await request.patch('/order/'+id).send(orderData)
        });
        then(/^o pedido possui "(.*)" "(.*)"$/, async (arg0, arg1) => {
            response = await request.get('/order/'+response.body.id)
            expect(response.body[arg0]).toBe(arg1);
        });
        // and(/^é enviado um email de "(.*)" para o email "(.*)"$/, async (arg0, arg1) => {
        //     const pedido = response.body.order
        //     response = await request.get("/user/all");
        //     const users = response.body
        //     var nome = ""
        //     const user = users.find(user => user.email === arg1);
        //     if (user) {
        //         nome = user.name;
        //     }
        //     if(arg0 === "Confirmação"){
        //         var email = {
        //             stat: arg0,
        //             order: pedido,
        //             name: nome
        //         }
        //     }
        //     else{
        //         var email = {
        //             stat: arg0,
        //             order: pedido,
        //             name: nome
        //         }
        //     };
        //     response = await request.post("/email/"+arg0).send(email);
        //     expect(response.status).toBe(200);
        // });
    });
    test('Pagamento errado informado pelo fornecedor', ({given, when, then, and}) => {
        given(/^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            }
            response = await request.post('/order').send(orderData);
        });
        when('é informado que o pagamento está errado', async () => {
            const id = response.body.id;
            const orderData = {
                status: "Erro no Pagamento"
            }
            await request.patch('/order/'+id).send(orderData)
        });
        then(/^o pedido possui "(.*)" "(.*)"$/, async (arg0, arg1) => {
            response = await request.get('/order/'+response.body.id)
            expect(response.body[arg0]).toBe(arg1);
        });
        // and(/^é enviado um email de "(.*)" para o email "(.*)"$/, async (arg0, arg1) => {
        //     const pedido = response.body.order
        //     response = await request.get("/user/all");
        //     const users = response.body
        //     var nome = ""
        //     const user = users.find(user => user.email === arg1);
        //     if (user) {
        //         nome = user.name;
        //     }
        //     if(arg0 === "Confirmação"){
        //         var email = {
        //             stat: arg0,
        //             order: pedido,
        //             name: nome
        //         }
        //     }
        //     else{
        //         var email = {
        //             stat: arg0,
        //             order: pedido,
        //             name: nome
        //         }
        //     };
        //     response = await request.post("/email/"+arg0).send(email);
        //     expect(response.status).toBe(200);
        // });
    });
})
