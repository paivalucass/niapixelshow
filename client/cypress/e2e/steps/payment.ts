import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou logado com email {string} e senha {string}', ( email: string, password: string ) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');

});

Given('eu adicionei o produto {string} de tamanho {string} e quantidade {string} ao carrinho', (product: string, size: string, quantity: string) => {
    cy.get('[data-cy="product-card-'+product+'"]').first().click()
    cy.get('[data-cy="quantity-input"]').clear().type(`${quantity}`);
    cy.get('[data-cy="size-select"]').click();
    cy.contains('li', size).click();
    cy.get('[data-cy="addCart"]').click();
    cy.get('button[name="Fechar"]').click();
});

When('estou na página {string}', (page: string) => {
    if(page === 'Pagamento'){
        cy.get('#payment_page').should('have.text', 'Pagamento');
    }
    else if(page === 'Carrinho de Compras')
        cy.get('button[aria-label="cart"]').click();
    else{
        cy.get('button[aria-label="account"]').click();
        cy.contains('li', 'Dashboard').click();
        cy.get('button').contains('Pagamento').click({force: true});
    }
});

When('seleciono a opção de {string}', (option: string) => {
    if(option === 'finalizar pedido'){
        cy.get('button[name="finalizar_pedido"]').click();
    }
    else if(option === 'alterar o status do pedido'){
        cy.get('table').should('be.visible')
        cy.contains('td', 'tjgc@cin.ufpe.br').first().parents('tr').within(() => {
            cy.get('button').contains('Alterar').click();
        });
    }
});

When('altero o status para {string}', (status: string) => {
    cy.get('[data-cy="select_status"]').click();
    cy.contains('li', status).click();
    cy.get('button').contains('Confirmar').click();
});

Then('estou na página Pagamento', () => {
    cy.get('#payment_page').should('have.text', 'Pagamento');
});

Then('eu posso ver um {string} para efetuar o pagamento', (pay_method: string) => {
    if(pay_method === 'QR Code'){
        cy.get('#pay_qrcode').should('have.text', pay_method)
    }
    else{
        cy.get('#pay_copycode').should('have.text', pay_method)
    }
});

Then('eu posso ver na tabela que agora o status do pedido é {string}', (status) => {
    cy.get('table').should('be.visible')
    cy.contains('td', 'tjgc@cin.ufpe.br').first().parents('tr').within(() => {
        cy.get('td').eq(3).should('have.text', status);
    });
});