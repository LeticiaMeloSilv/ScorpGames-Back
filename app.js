/************************************************************************************************************
 * Objetivo: O objetivo geral dessa aplicação é fazer comunidades de jogos, com varios usuarios, sistema de 
 * favoritos, chat sql e sistema de denuncia
 * Data: 02/2025
 * Autor: Letícia Melo Silva
 * Versão: 1.0
************************************************************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())

    next()
})
const controllerUsuarios = require('./controller/controller_usuarios.js')
const bodyParserJSON = bodyParser.json()

//*******************************************************************************USUARIOS********************************************************************************************/
//lista todos os usuarios
app.get('/v1/scorpgames/usuarios', cors(), async function (request, response) {
    let dadosUsuarios = await controllerUsuarios.getListarUsuarios()

    response.json(dadosUsuarios)
    response.status(200)

})//:)

//pega o usuarios pelo nome
app.get('/v1/scorpgames/usuarios/nome', cors(), async function (request, response) {
    let nome = request.query.nome
    let dadosUsuario = await controllerUsuarios.getBuscarUsuarioNome(nome)

    response.json(dadosUsuario)
    response.status(200)
})//:)

//pega o usuario por id
app.get('/v1/scorpgames/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuarios.getBuscarUsuarioById(idUsuario)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})//:)

//cadastra novo usuario
app.post('/v1/scorpgames/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoUsuario = await controllerUsuarios.setInserirUsuario(dadosBody,contentType)

    response.status(resultDadosNovoUsuario.status_code)
    response.json(resultDadosNovoUsuario)
})//:)
//deleta usuario
app.delete('/v1/scorpgames/usuario/:id', cors(), async function (request,response) {
    let idUsuario = request.params.id

    let resultDados = await controllerUsuarios.setExcluirUsuario(idUsuario)

    response.status(resultDados.status_code)
    response.json(resultDados)
})//:)
//atualiza usuario
app.put('/v1/scorpgames/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    let idUsuario = request.params.id
    console.log('entrou aq');

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoUsuario = await controllerUsuarios.setAtualizarUsuario(idUsuario,dadosBody,contentType)
console.log(resultDadosNovoUsuario);

    response.status(resultDadosNovoUsuario.status_code)
    response.json(resultDadosNovoUsuario)
})//:)
//atualiza senha
app.put('/v1/scorpgames/usuario/validacao/:id', cors(), bodyParserJSON, async function (request, response) {
    let idUsuario = request.params.id
console.log('a');

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoUsuario = await controllerUsuarios.setAtualizarSenhaUsuario(idUsuario,dadosBody,contentType)
console.log(resultDadosNovoUsuario);

    response.status(resultDadosNovoUsuario.status_code)
    response.json(resultDadosNovoUsuario)
})//:)
//login
app.get('/v1/scorpgames/usuario', cors(), bodyParserJSON, async (request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dadosUsuario = await controllerUsuarios.getValidarUsuario(dadosBody.email, dadosBody.senha, contentType)    
    response.status(dadosUsuario.status_code);
    response.json(dadosUsuario)
})//:)








//cadastra novo usuario
app.post('/v2/scorpgames/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoUsuario = await controllerUsuarios.setInserirUsuarioV2(dadosBody,contentType)

    response.status(resultDadosNovoUsuario.status_code)
    response.json(resultDadosNovoUsuario)
})//:)



//FAZER ESSES DAQUI USANDO O ARGON2
//atualiza senha
app.put('/v1/scorpgames/usuario/validacao/:id', cors(), bodyParserJSON, async function (request, response) {
    let idUsuario = request.params.id
console.log('a');

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoUsuario = await controllerUsuarios.setAtualizarSenhaUsuario(idUsuario,dadosBody,contentType)
console.log(resultDadosNovoUsuario);

    response.status(resultDadosNovoUsuario.status_code)
    response.json(resultDadosNovoUsuario)
})//:)
//login
app.get('/v1/scorpgames/usuario', cors(), bodyParserJSON, async (request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dadosUsuario = await controllerUsuarios.getValidarUsuario(dadosBody.email, dadosBody.senha, contentType)    
    response.status(dadosUsuario.status_code);
    response.json(dadosUsuario)
})//:)


app.listen('8080', function () {
    console.log('API funcionando!!!! Bom trabalho, dá uma descansada, um cafézinho nunca cai mal!!')
})