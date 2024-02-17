const acessToken = `Bearer ${Cypress.env('gitlab_access_token')}`
const urlAuth = 'http://localhost:8089/api/v1/auth'
const urlViagens = 'http://localhost:8089/api/v1/viagens'
const authorizationToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE3MDgxMzIxMDA1MTksImV4cCI6MTcwODIzMjA5OX0.lMM5IxDR0gIgxRIw5Ueqqhcfm_xihfEh_P_T5PRd6051IzZZQwkGfYXh5mckB_eYvIt4IUhMoQUmuPiIRcmmSQ'



Cypress.Commands.add('api_CreateProject', project => {

    cy.request({

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



Cypress.Commands.add('api_fazerLoginComAdministrador', ()=>{

    cy.request({

        method: 'POST',
        url: urlAuth,
        body: {
            email: 'admin@email.com',
            senha: '654321'
        },

    })
})


Cypress.Commands.add('api_cadastrarViagem', dadosViagem =>{

    cy.request({

        method: 'POST',
        url: urlViagens,
        body: {
            acompanhante: dadosViagem.acompanhante,
            dataPartida: dadosViagem.dataPartida,
            dataRetorno: dadosViagem.dataRetorno,
            localDeDestino: dadosViagem.localDeDestino,
            regiao: dadosViagem.regiao
        },
        headers: {Authorization: authorizationToken},
    })
})