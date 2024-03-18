import { faker } from '@faker-js/faker'


describe('setMilestonOnIssue', () =>{

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

    }


    beforeEach(() => {
        cy.api_DeleteAllProjects()
        cy.login()
        cy.api_CreateIssue(issue)
          .then(response => {
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
          })
      })

      it('successfully', () =>{

        

      })

})