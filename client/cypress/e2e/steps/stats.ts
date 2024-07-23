import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach(() => {
    cy.visit('/')
})

Given("o usuário está na pagina dashboard", function () {
    cy.visit('/admin');
});

When('clica no botão \"Estatísticas\"', () => {
    cy.get('button').contains('Estat').click();
});

Then('o usuário agora está na página de estatísticas', () => {
    cy.url().should("include", "/stats");
});

Given("o usuário está na página de estatísticas", function () {
    cy.visit('/stats/stats');
});

When('define ano para "2024"', () => {
    cy.get('input[name="Ano"]').clear({force: true}).type('2024', {force: true});
});

When('clica no botão "Filtrar"', () => {
    cy.get('button').contains('Filtrar').click({force: true});
});

Then('a tabela de produtos agora tem produtos de data "2024-01"', () => {
    cy.get('#tableText').should('have.text', 'Estatísticas de produtos - 2024-01');
});

When('a tabela de produtos tem produtos de data "2024-01', () => {
    cy.get('input[name="Ano"]').clear({force: true}).type('2024', {force: true});
    cy.get('button').contains('Filtrar').click({force: true});
});

Given('a tabela de produtos tem produtos de data "2024-01"', function (string) {
    cy.get('input[name="Ano"]').clear({force: true}).type('2024', {force: true});
    cy.get('button').contains('Filtrar').click({force: true});
});

When('clica no botão "Reset"', () => {
    cy.get('#resetButton').click({force: true});
});

Then("a tabela de produtos agora tem produtos totais", function () {
    cy.get('#tableText').should('have.text', 'Estatísticas de produtos - Total');
});