import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o administrador com e mail {string} e senha {string} está logado no painel de administração do e-commerce', (username : string, password : string) => {
    cy.visit('/sign-in');
    cy.get('input[name="email"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Given('está na página "Gerenciamento de Categorias"', () => {
    cy.visit('/categoriespage');
});

When('ele seleciona a opção "Criar Categoria"', () => {
     cy.get('button').contains('Criar Categoria').click();
});

Given('ele insere o nome {string}', (name: string) => {
     cy.get('input[name="Nome da Categoria"]').type(name);
});

Then('ele aperta o botão "Criar" o cadastro da categoria pode ver a nova categoria na lista de categorias.', () => {
     cy.get('button').contains('Criar').click();
});

When('ele seleciona a opção "Editar" para a categoria {string}', (name: string) => {
    cy.get(`[data-cy="id-edit-${name}"]`).contains('Editar').click();
});

Given('ele adiciona a palavra {string} ao seu nome', (name: string) => {
    cy.get('input[name="Nome da Categoria Novo"]').type(name);
});

Then('ele aperta o botão "Salvar" e pode ver a caregoria atualizada na lista de categorias.', () => {
    cy.get('button').contains('Salvar').click();
});

When('ele seleciona a opção "Excluir" na categoria {string}', (name: string) => {
    cy.get(`[data-cy="id-delete-${name}"]`).contains('Excluir').click();
});

Then('ele aperta o botão "Excluir" e a categoria deletada some da lista de categorias.', () => {
    cy.get(`[data-cy="tag"]`).contains('Excluir').click();
});

Given('não adiciona nenhum nome e confirma', () => {
    cy.get('button').contains('Criar').click();
});

Then('ele recebe uma mensagem de erro.', () => {
     cy.get('[data-cy="error-tag"]').should('be.visible').and('contain', 'O nome da categoria é obrigatório!');
});