//Contém todos os comandos customizados

Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
  ) => {
    const login = () => {
      cy.visit('/users/sign_in') //Está sendo colocado apenas /users/sign_in, porque no arquivo "cypress.config.js", foi definida
                                //a URL base, então basta apenas completar.
                                //URL base: http://localhost
                                //Complemento: /users/sign_in
                                //O que será acessado: http://localhost/users/sign_in
  
      cy.get("[data-qa-selector='login_field']").type(user)
      cy.get("[data-qa-selector='password_field']").type(password, { log: false }) //o comando { log: false } é utilizado para dados 
                                                                                    //sensíveis, para o cypress não exibir.
      cy.get("[data-qa-selector='sign_in_button']").click()

      //Foi utilizado o 'data-qa-selector' para mapear os objetos, mas poderia ser utilizado o ID sem problemas.
    }
  
    login()
  })
  