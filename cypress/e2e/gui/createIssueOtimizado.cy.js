import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }


describe('Create Issue', options, () => {

  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),

    //Foi criado este objeto "project", para otimizar e melhorar o código
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  beforeEach(() => {
    cy.api_DeleteAllProjects()
    cy.login()
    cy.api_CreateProject(issue.project)


    // cy.gui_createProject(issue.project) //Como parâmetro, é enviada as informações do objeto "project", que estão armazenadas na 
                                        //variável issue. Por isso dentro do parêntese está "issue.project", porque o objeto
                                        //"project" está dentro da variável "issue" (é como se fosse uma cadeia de acesso).
  })

  it('successfully', () => {
    cy.gui_createIssueOtimizada(issue)


    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })
})
