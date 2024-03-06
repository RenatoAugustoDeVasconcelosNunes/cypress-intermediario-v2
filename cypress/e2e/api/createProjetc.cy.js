
import { faker } from '@faker-js/faker'


describe ('Create Project', () => {

    beforeEach(() => cy.api_DeleteAllProjects())

    it('sucessfully', () => {

        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(3)
        }


        cy.api_CreateProject(project)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project.name)
                expect(response.body.description).to.equal(project.description)

            })
    })

    

})