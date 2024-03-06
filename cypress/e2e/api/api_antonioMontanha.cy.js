import { faker } from '@faker-js/faker'


describe ('api_antonioMontanha', ()=>{


    it.only('sucessfully', ()=>{

        cy.api_fazerLoginComAdministrador()
            .then(response =>{
                expect(response.status).to.equal(200)
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


    it('cadastrarViagemComAPIPlugin', ()=>{
        const dadosViagem = {
            acompanhante: faker.name.firstName(),
            dataPartida: '2024-02-20',
            dataRetorno: '2024-03-20',
            localDeDestino: faker.random.word(),
            regiao: faker.random.word()
        }

        cy.api_cadastrarViagem_com_plugin_API(dadosViagem)
            .then(response =>{
                expect(response.status).to.equal(201)
                expect(response.body.data.localDeDestino).to.equal(dadosViagem.localDeDestino)
                expect(response.body.data.dataPartida).to.equal(dadosViagem.dataPartida)
                expect(response.body.data.dataRetorno).to.equal(dadosViagem.dataRetorno)
                expect(response.body.data.acompanhante).to.equal(dadosViagem.acompanhante)
                expect(response.body.data.regiao).to.equal(dadosViagem.regiao)

            })
    })



})