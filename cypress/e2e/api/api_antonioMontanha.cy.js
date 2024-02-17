import { faker } from '@faker-js/faker'


describe ('api_antonioMontanha', ()=>{


    it('sucessfully', ()=>{

        cy.api_fazerLoginComAdministrador()
            .then(response =>{
                expect(response.status).to.equal(200)
            })
    })

    it.only('cadastrarViagem', ()=>{

        const dadosViagem = {
            acompanhante: faker.name.firstName(),
            dataPartida: faker.date.between('now', '2024-02-20'),
            dataRetorno: faker.date.future(),
            localDeDestino: faker.random.locale(),
            regiao: faker.random.word()
        }

        cy.api_cadastrarViagem(dadosViagem)
            .then(response =>{
                expect(response.status).to.equal(201)
                expect(response.body.localDeDestino).to.equal(dadosViagem.localDeDestino)
                expect(response.body.dataPartida).to.equal(dadosViagem.dataPartida)
                expect(response.body.dataRetorno).to.equal(dadosViagem.dataRetorno)
                expect(response.body.acompanhante).to.equal(dadosViagem.acompanhante)
                expect(response.body.regiao).to.equal(dadosViagem.regiao)

            })
    })






})