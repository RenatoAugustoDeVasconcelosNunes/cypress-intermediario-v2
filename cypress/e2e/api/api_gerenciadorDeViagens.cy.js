import { faker } from '@faker-js/faker'


describe ('api_antonioMontanha', ()=>{

    beforeEach (() => {
        cy.api_validaStatusAplicacaoController()
        cy.api_deletaViagens()
    })

   
    it('logarComAdministrador', ()=>{

        cy.api_fazerLoginComAdministrador()
            .then(response =>{
                expect(response.status).to.equal(200)
                expect(response.body).is.not.empty
                expect(response.body.data.token).is.not.empty

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
                expect(response.body).is.not.empty
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
                expect(response.body).is.not.empty
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
            .then(resp => resp.body.data.forEach(respForEach =>{
                expect(resp.status).to.equal(200)
                expect(respForEach.id).is.not.null
                expect(respForEach.regiao).to.equal(dadosViagem.regiao)
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
            .then(responseCadastrarViagem =>{
                expect(responseCadastrarViagem.status).to.equal(201)
                expect(responseCadastrarViagem.body.data.id).is.not.null

                //Dados de entrada:
                cy.api_alterarDadosViagem('Acompanhante', nomeAcompanhante, responseCadastrarViagem.body.data.id, dadosViagem)
                    .then(respAlteraDados =>{
                        expect(respAlteraDados.status).to.equal(204)
                                                
                        cy.api_retornaViagemDeRegiaoEspecifica(dadosViagem.regiao)
                        .then(respRetornaViagem => respRetornaViagem.body.data.forEach(respForEach =>{
                            expect(respRetornaViagem.status).to.equal(200)
                            expect(respForEach.regiao).to.equal(dadosViagem.regiao)
                            expect(respForEach.id).to.equal(responseCadastrarViagem.body.data.id)
                            expect(respForEach.acompanhante).to.equal(nomeAcompanhante)
                        }))

                 })
            })

    })


    it('deletarViagemEspecifica', () =>{

        const dadosViagem = {
            acompanhante: faker.name.firstName(),
            dataPartida: '2024-02-20',
            dataRetorno: '2024-03-20',
            localDeDestino: faker.random.word(),
            regiao: faker.random.word()
        }
        
        cy.api_deletaViagemEspecifica(dadosViagem)
            .then(respDeletaViagem =>{
                expect(respDeletaViagem.status).to.equal(204)
            })
        
    })

})