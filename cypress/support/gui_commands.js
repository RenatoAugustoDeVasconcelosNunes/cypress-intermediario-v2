//Contém todos os comandos customizados

Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession  = true } = {},
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

    //Utilizada para validar que está na página home
    const validate = () => {
      cy.visit('/')
      cy.location('pathname', { timeout: 1000 }) //Pega o pathname em 1 segundo (1000 milisegundos), e verifica que não é igual a /users/sign_in
        .should('not.eq', '/users/sign_in')
    }


    const options = {
      cacheAcrossSpecs: true,
      validate,
    }

    if (cacheSession){

      cy.session(user, login, options)
    } 
    else {
      login() //Pelo fato do "const login" ser uma função, precisamos retornar a função, e por isso tem este "login()"
    }
  
    
  })


Cypress.Commands.add('logout', () =>{

  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()

})

Cypress.Commands.add('gui_createProject', project =>{

  cy.visit('/projects/new')
  cy.get('#project_name').type(project.name, {delay: 0})
  cy.get('#project_description').type(project.description, {delay: 0})
  cy.get('#project_initialize_with_readme').check()
  cy.contains('Create project').click()



})



Cypress.Commands.add('gui_createIssue', issue =>{
//shortcuts-issues qa-issues-item
  cy.get('.qa-issues-item').click()
  cy.get('#new_issue_link').click()
  cy.get('#issue_title').type(issue.title, {delay: 0})
  cy.get('#issue_description').type(issue.description, {delay: 0})
  cy.contains('Submit issue').click()  


})

Cypress.Commands.add('gui_createIssueOtimizada', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title, {delay: 0})
  cy.get('.qa-issuable-form-description').type(issue.description, {delay: 0})
  cy.contains('Submit issue').click()
})
  

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})


Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})