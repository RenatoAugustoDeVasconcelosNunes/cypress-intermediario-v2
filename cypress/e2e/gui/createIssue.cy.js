import { faker } from '@faker-js/faker'

describe('Create Issue', ()=>{

    const project = {

        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }

    const issue = {

        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5)

    }

    //Pré condição
    beforeEach(()=>{

        cy.login()
        cy.gui_createProject(project)
        
    })

    it('successfully', ()=>{

        cy.gui_createIssue(issue)

        cy.get('.issue-details').should('contain', issue.title).and('contain', issue.description)

    })


})