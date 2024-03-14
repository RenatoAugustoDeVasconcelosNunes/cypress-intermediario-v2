import { faker } from '@faker-js/faker'


describe ('api_antonioMontanha', ()=>{

    beforeEach (() => {
        cy.api_validaStatusAplicacaoController()
        cy.api_deletaViagens()
    })

    beforeEach(()=>{
        cy.api_DeleteAllProjects()
        cy.login()
        cy.gui_createProject(project)
        
    })


    it('logarComAdministrador', ()=>{

        cy.api_fazerLoginComAdministrador()
            .then(response =>{
                expect(response.status).to.equal(200)
                // print(response.body.data.token)
            })
    })


    it('cadastrarViagem', ()=>{
        const dadosViagem = {
            acompanhante: faker.name.firstName(),
            dataPartida: '2024-02-20',
            dataRetorno: '2024-03-20',
            localDeDestino: faker.random.word(),
            regiao: faker.random.word()
        }

        cy.api_cadastrarViagem(dadosViagem)
            .then(response =>{
                expect(response.status).to.equal(201)
                expect(response.body.data.localDeDestino).to.equal(dadosViagem.localDeDestino)
                expect(response.body.data.dataPartida).to.equal(dadosViagem.dataPartida)
                expect(response.body.data.dataRetorno).to.equal(dadosViagem.dataRetorno)
                expect(response.body.data.acompanhante).to.equal(dadosViagem.acompanhante)
                expect(response.body.data.regiao).to.equal(dadosViagem.regiao)

            })
    })


    it('retornarViagens', ()=>{

        cy.api_retornaTodasAsViagens()
            .then(response => {
                expect(response.status).to.equal(200)
            })

    })

    
    it('retornarViagemRegiaoEspecifica', () =>{
        
        //Pré condição:
        const dadosViagem = {
            acompanhante: faker.name.firstName(),
            dataPartida: '2024-02-20',
            dataRetorno: '2024-03-20',
            localDeDestino: faker.random.word(),
            regiao: faker.random.word()
        }

        cy.api_cadastrarViagem(dadosViagem)
            .then(resp =>{
                expect(resp.status).to.equal(201)
            })

        //Dados de Entrada
        cy.api_retornaViagemDeRegiaoEspecifica(dadosViagem.regiao)
            .then(resp => resp.body.data.forEach(project =>{
                expect(resp.status).to.equal(200)
                expect(project.regiao).to.equal(dadosViagem.regiao)
            }))

        
    })


    it('alterarDadoAcompanhante', () =>{

        //Pré condição:
        const dadosViagem = {
            acompanhante: faker.name.firstName(),
            dataPartida: '2024-02-20',
            dataRetorno: '2024-03-20',
            localDeDestino: faker.random.word(),
            regiao: faker.random.word()
        }
        const nomeAcompanhante = faker.name.firstName()

        cy.api_cadastrarViagem(dadosViagem)
            .then(response =>{
                expect(response.status).to.equal(201)

                //Dados de entrada:
                cy.api_alterarDadosViagem('Acompanhante', nomeAcompanhante, response.body.data.id, dadosViagem)
                    .then(resp =>{
                        expect(resp.status).to.equal(204)
                        
                        cy.api_retornaViagemDeRegiaoEspecifica(dadosViagem.regiao)
                        .then(resp => resp.body.data.forEach(project =>{
                            expect(resp.status).to.equal(200)
                            expect(project.regiao).to.equal(dadosViagem.regiao)
                            expect(project.id).to.equal(response.body.data.id)
                        }))

                 })
            })

    })


    it('deletarViagemEspecifica', () =>{

        cy.api_deletaViagemEspecifica()
        .then(resp => {
            expect(resp.status).to.equal(204)
            expect(resp.body).is.empty
        })
    })

})