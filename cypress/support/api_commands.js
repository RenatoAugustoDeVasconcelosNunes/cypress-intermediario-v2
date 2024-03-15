import { faker } from '@faker-js/faker'

const acessToken = `Bearer ${Cypress.env('gitlab_access_token')}`
const urlAuth = Cypress.env('urlAuth')
const urlViagens = Cypress.env('urlViagens')
const urlStatusController = Cypress.env('urlStatusController')




Cypress.Commands.add('api_CreateProject', project => {

    cy.api({

        method: 'POST',
        url: `/api/v4/projects/`,
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },

        headers: { Authorization: acessToken },
    })

})


Cypress.Commands.add('api_GetAllProjects', ()=>{

    cy.api({

        method: 'GET',
        url: '/api/v4/projects/',
        headers: {Authorization: acessToken},

    })
})


Cypress.Commands.add('api_DeleteAllProjects', ()=>{

    cy.api_GetAllProjects()
        .then(res => res.body.forEach(project => 
            
            cy.api({
                method:'DELETE', 
                url: `/api/v4/projects/${project.id}`,
                headers: {Authorization: acessToken},
        })))
})


Cypress.Commands.add('api_CreateIssue', issue =>{

    //Pré-condição (para criar uma Issue, é necessário ter um projeto criado)
   cy.api_CreateProject(issue.project)

   //Dados de entrada. Está sendo realizado um then, para que seja possível pegar o id da requisição de criação de projeto, e passar
   //na url do POST de criação da Issue.
    .then(response => {
        cy.api({
         method:'POST', 
         url: `/api/v4/projects/${response.body.id}/issues`,
         body:{
            title: issue.title,
            description: issue.description
         },
         headers: {Authorization: acessToken},
        })
    })
})








//API ANTÔNIO MONTANHA:


Cypress.Commands.add('api_validaStatusAplicacaoController', () =>{

    cy.api({
        method: 'GET',
        url: urlStatusController
    })
    .then(response => {
        expect(response.status).to.equal(200)
    })
})

Cypress.Commands.add('api_fazerLoginComAdministrador', ()=>{

    cy.api({

        method: 'POST',
        url: urlAuth,
        body: {
            email: Cypress.env('emailAdm'),
            senha: Cypress.env('senhaAdm')
        },

    })
})



Cypress.Commands.add('api_fazerLoginComUsuario', ()=>{

    cy.api({

        method: 'POST',
        url: urlAuth,
        body: {
            email: Cypress.env('emailUser'),
            senha: Cypress.env('senhaUser')
        },

    })
})

Cypress.Commands.add('api_cadastrarViagem', dadosViagem =>{

    cy.api_fazerLoginComAdministrador()
        .then(response => {
            cy.api({
        
            method: 'POST',
            url: urlViagens,
            body: {
                
                acompanhante: dadosViagem.acompanhante,
                dataPartida: dadosViagem.dataPartida,
                dataRetorno: dadosViagem.dataRetorno,
                localDeDestino: dadosViagem.localDeDestino,
                regiao: dadosViagem.regiao
                },
            headers: {Authorization: response.body.data.token},
            })

        })
    
})


Cypress.Commands.add('api_retornaTodasAsViagens', () =>{

    cy.api_fazerLoginComUsuario()
        .then(response =>{
            cy.api({
                method: 'GET',
                url: urlViagens,
                headers: {Authorization: response.body.data.token}
            })
        })

})


Cypress.Commands.add('api_retornaViagemDeRegiaoEspecifica', (regiaoEspecifica) =>{

    cy.api_fazerLoginComUsuario()
        .then(response=>{
            expect(response.status).to.equal(200)

            cy.api({
                method: 'GET',
                url: `${urlViagens}?regiao=${regiaoEspecifica}`,
                headers: {Authorization: response.body.data.token}
                })
        })
    
    
})



Cypress.Commands.add('api_alterarDadosViagem', (informacaoParaAlterar, dadoParaAlterar, idParaAlterar, dadosViagem) =>{

    cy.condicionaisAlteracaoDadosViagem(dadoParaAlterar, idParaAlterar, informacaoParaAlterar, dadosViagem)

})


Cypress.Commands.add('condicionaisAlteracaoDadosViagem', (dadoParaAlterar, idParaAlterar, informacaoParaAlterar, dadosCadastroViagem) =>{



   cy.api_fazerLoginComAdministrador()
        .then(response =>{
            expect(response.status).to.equal(200)
            
            if (informacaoParaAlterar == 'Acompanhante'){

                cy.api({

                    method: 'PUT',
                    url: `${urlViagens}/${idParaAlterar}`,
                    body:{
                        acompanhante: dadoParaAlterar,
                        dataPartida: dadosCadastroViagem.dataPartida,
                        dataRetorno: dadosCadastroViagem.dataRetorno,
                        localDeDestino: dadosCadastroViagem.localDeDestino,
                        regiao: dadosCadastroViagem.regiao
                        },
                        headers: {Authorization: response.body.data.token}
                })

            }


        })

})


Cypress.Commands.add('api_deletaViagens', () =>{

    cy.api_fazerLoginComAdministrador()
        .then(response => {
            expect(response.status).to.equal(200)

            cy.api_retornaTodasAsViagens()
                .then(resp => resp.body.data.forEach(respForEach =>

                    // expect(resp.status).to.equal(200),
                    
                        cy.api({
                            method: 'DELETE',
                            url: `${urlViagens}/${respForEach.id}`,
                            headers: {Authorization: response.body.data.token} 
                    })))
        })
})



Cypress.Commands.add('api_deletaViagemEspecifica', (dadosViagem) =>{

   cy.api_cadastrarViagem(dadosViagem)
    .then(respCadastro =>{
        expect(respCadastro.status).to.equal(201)

        cy.api_retornaTodasAsViagens()
        .then(respRetornaViagens => {

            expect(respRetornaViagens.status).to.equal(200)

            cy.api_fazerLoginComAdministrador()
                .then(respLoginAdm =>{
                    expect(respLoginAdm.status).to.equal(200)
                    
                    cy.api({
                        method: 'DELETE',
                        url: `${urlViagens}/${respCadastro.body.data.id}`,
                        headers: {Authorization: respLoginAdm.body.data.token} 
                    })

                })
                
        })
    
    })

})


