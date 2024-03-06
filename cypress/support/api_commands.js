const acessToken = `Bearer ${Cypress.env('gitlab_access_token')}`
const urlAuth = 'http://localhost:8089/api/v1/auth'
const urlViagens = 'http://localhost:8089/api/v1/viagens'
const authorizationToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE3MDk2NDQ1NTgxMTEsImV4cCI6MTcwOTc0NDU1N30.hwpflId4I2Olymdv1TCjtoMLZNCcqs6UvI434TUTeQuubfkJsKy647-1xxwXgFAwpU-up2ULu074iFbDpSIWcw'



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





//API ANTÔNIO MONTANHA:

Cypress.Commands.add('api_fazerLoginComAdministrador', ()=>{

    cy.api({

        method: 'POST',
        url: urlAuth,
        body: {
            email: 'admin@email.com',
            senha: '654321'
        },

    })
})


Cypress.Commands.add('api_cadastrarViagem', dadosViagem =>{
    
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
        headers: {Authorization: authorizationToken},
    })
})



Cypress.Commands.add('api_cadastrarViagem_com_plugin_API', dadosViagem =>{
    

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
        headers: {Authorization: authorizationToken},
    })
})



