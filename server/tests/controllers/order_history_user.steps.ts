import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import expect from 'expect'
import { firestoreDB, adminAuth } from '../../src/services/firebase/firebaseAdmin';
import { Stats } from 'fs';
import { z } from 'zod';

const feature = loadFeature('tests/features/order_history_user.feature');


defineFeature(feature, (test)=>{
    let request = supertest(app)
    let response: supertest.Response;
    jest.setTimeout(15000);

    async function clearDatabase(){
        const orders = await firestoreDB.collection('orders').get();
        const users = await firestoreDB.collection('users').get();
        const batch = firestoreDB.batch();
        for (const userDoc of users.docs) {
            await adminAuth.deleteUser(userDoc.id);
            batch.delete(userDoc.ref);
        }
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
    
    test('Retornar pedidos no histórico de pedidos com pedidos cadastrados', ({given, and, when, then}) => {
        given(/^um usuário com nome "(.*)", email "(.*)", senha "(.*)" e telefone "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
            const user = {
                name: arg0,
                phone: arg3,
                email: arg1,
                password: arg2,
                is_admin: false
            };
            response = await request.post('/user').send(user);
        });
        and(/^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            response = await request.post('/order').send(orderData);
        });
        when('acessar a página de Histórico de Pedidos', async () => {
            const filt = {
                func: "Igual a",
                filter: response.body.order.email
            }
            response = await request.get('/order/filter/email').send(filt);
            console.log(response.body);
        });
        then(/^é retornado o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            expect(response.body[0].email).toBe(arg0);
            expect(response.body[0].item).toBe(arg1);
            expect(response.body[0].description).toBe(arg2);
            expect(response.body[0].qtd).toBe(parseInt(arg3));
            expect(response.body[0].price).toBe(parseFloat(arg4));
            expect(response.body[0].status).toBe(arg5);
            expect(response.body[0].date).toBe(arg6);
            expect(response.body[0].addr).toBe(arg7);
        });
    });
    test('Retornar mensagem no histórico de pedidos sem pedidos cadastrados', ({given, and, when, then}) => {
        given(/^um usuário com nome "(.*)", email "(.*)", senha "(.*)" e telefone "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
            const user = {
                name: arg0,
                phone: arg3,
                email: arg1,
                password: arg2,
                is_admin: false
            };
            response = await request.post('/user').send(user);
        });
        and('não tem cadastrado nenhum pedido', async () => {
            const email = response.body.email;
            const orders = await firestoreDB.collection('orders').where("email", "==", email).get();
            const batch = firestoreDB.batch();
            orders.forEach(doc => { batch.delete(doc.ref) });
            await batch.commit();
        });
        when('acessar a página de Histórico de Pedidos', async () => {
            const filt = {
                func: "Igual a",
                filter: response.body.email
            }
            response = await request.get('/order/filter/email').send(filt);
        });
        then('é retornada uma mensagem informando que não há pedidos cadastrados', async () => {
            expect(response.status).toBe(426);
        });
    });
    test('Retornar pedidos filtrados', ({given, and, when, then}) => {
        given(/^um usuário com nome "(.*)", email "(.*)", senha "(.*)" e telefone "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
            const user = {
                name: arg0,
                phone: arg3,
                email: arg1,
                password: arg2,
                is_admin: false
            };
            response = await request.post('/user').send(user);
        });
        and(/^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            response = await request.post('/order').send(orderData);
        });
        and(/^o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)" cadastrado$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            const orderData = {
                email: arg0,
                item: arg1,
                description: arg2,
                qtd: parseInt(arg3),
                price: parseFloat(arg4),
                status: arg5,
                date: arg6,
                addr: arg7
            };
            response = await request.post('/order').send(orderData);
        });
        when(/^filtrar por "(.*)" "(.*)"$/, async (arg0, arg1) => {
            const condição = arg1.split(" ");
            condição[2] = condição.slice(2).join(' ');
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const isDate = (str: string) => {
                if(!dateRegex.test(str)){
                    return false;
                }
                return true;
            }
            var filt
            if(Number.isNaN(parseFloat(condição[2])) || isDate(condição[2])){
                filt = {
                    func: condição[0] + ' ' + condição[1],
                    filter: condição[2]
                }
            }
            else {
                filt = {
                    func: condição[0] + ' ' + condição[1],
                    filter: parseFloat(condição[2])
                }
            }
            response = await request.get('/order/filter/'+arg0).send(filt);
        });
        then(/^é retornado o pedido com email "(.*)", item "(.*)" com descrição "(.*)", quantidade "(.*)", preço "(.*)" reais, status "(.*)", criado em "(.*)", para o endereço "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) => {
            expect(response.body[0].email).toBe(arg0);
            expect(response.body[0].item).toBe(arg1);
            expect(response.body[0].description).toBe(arg2);
            expect(response.body[0].qtd).toBe(parseInt(arg3));
            expect(response.body[0].price).toBe(parseFloat(arg4));
            expect(response.body[0].status).toBe(arg5);
            expect(response.body[0].date).toBe(arg6);
            expect(response.body[0].addr).toBe(arg7);
        });
    });
});