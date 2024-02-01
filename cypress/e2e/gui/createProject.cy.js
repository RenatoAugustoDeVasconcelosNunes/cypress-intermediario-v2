import { faker } from '@faker-js/faker'

describe('Create Project', ()=>{

    //Pré condição
    beforeEach(()=>{

        cy.login()
        
    })


    it('successfully', ()=>{
        //Pré condição
        const project = {

            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        //Dados de entrada
        cy.gui_createProject(project)

        //Resultado esperado
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')


    })


})