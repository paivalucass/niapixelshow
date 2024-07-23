import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que estou deslogado', () => {
  cy.visit("/product");
  cy.get('body').then(($body) => {
      cy.get('button[aria-label="account"]').click();
      if ($body.find('button:contains("Logout")').length) {
        cy.contains("Logout").click();
      } 
  });
});

Given('que estou logado como {string}, com senha {string}', (username, password) => {
  cy.intercept('POST', '/auth/login').as('loginRequest');
  cy.visit('/sign-in');
  if (typeof username == 'string')
    cy.get('input[name="email"]').type(username);
  if (typeof password == 'string')
    cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  cy.wait('@loginRequest').then((interception) => {
    const token = interception?.response?.body.token; // Ajuste conforme necessário
    cy.setCookie('authToken', token);
    Cypress.env('authToken', token); // Salva o token no ambiente do Cypress
  });
});

Given('que estou na página {string}', (page) => {
  cy.visit(`/${page}`);
});

When('preencher os campos nome {string}, descrição {string}, preço {string}, status {string} e categoria {string}', (name, description, price, status, category) => {
  if (name != "") {
    cy.get('input[name="name"]').type(name);
  }
  cy.get('input[name="description"]').type(description);
  cy.get('input[name="price"]').type(price);
  cy.get('input[name="category.name"]').type(category);
  cy.get('input[name="category.description"]').type(`${category} description`);
  cy.get('div[id="mui-component-select-status"]').click();
  if (status === "Sim")
    cy.get('option[data-value="true"]').click();
  else
    cy.get('option[data-value="false"]').click();
});

When('seleciono a opção {string}', (option) => {
  cy.get('button').contains(option).click();
});

Then('eu devo ver uma mensagem de confirmação {string}', (message) => {
  cy.get('.MuiAlert-message').should('contain', message);
});

Given('que eu tenho um produto cadastrado', () => {
  cy.request('/product') // Ajustar o endpoint conforme necessário
    .its('body')
    .then((products) => {
      if (products.length > 0) {
        const product = products[0]; // Pega o primeiro produto da lista
        cy.wrap(product).as('product');
      } else {
        throw new Error('Nenhum produto encontrado.');
      }
    });
});

When('clicar na opção {string} do produto com nome {string}', (option, productName) => {
  cy.contains(productName).parents('div[id="product-card"]').find('button').contains(option).click();
});

When('alterar os campos nome para {string} e preço para {string}', (name:string, price:string) => {
  if (name != "") {
    cy.get('input[name="name"]').clear().type(name);
  } else {
    cy.get('input[name="name"]').clear();
  }
  cy.get('input[name="price"]').clear().type(price);
});

Then('eu devo ver uma mensagem de erro {string}', (message) => {
  cy.get('.MuiAlert-message').should('contain', message);
});
