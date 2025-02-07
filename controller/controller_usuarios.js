/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das requisicões da API de usuários
 * Data: 02/2025
 * Autor: Letícia Melo Silva
 * Versão: 1.0
 * 
************************************************************************************************************/

const message = require('../modulo/config.js')
const usuarioDao = require('../model/DAO/usuarios.js');
const validacoes = require('./validacoes.js');
const argon2 = require('argon2');

const getValidarUsuario = async (email, senha, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let emailUsuario = email
            let senhaUsuario = senha

            let UsuarioJSON = {}

            if (emailUsuario == '' || emailUsuario == undefined || emailUsuario == null || senhaUsuario == '' || senhaUsuario == null || senhaUsuario == undefined) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let dadosUsuario = await usuarioDao.selectValidarUsuario(emailUsuario, senhaUsuario)
console.log(dadosUsuario);

                if (dadosUsuario) {
                    if (dadosUsuario.length > 0) {
                        UsuarioJSON.status = message.SUCESS_VALIDATED_ITEM.status
                        UsuarioJSON.status_code = message.SUCESS_VALIDATED_ITEM.status_code
                        UsuarioJSON.message = message.SUCESS_VALIDATED_ITEM.message
                        UsuarioJSON.usuario = dadosUsuario[0]

                        return UsuarioJSON
                    } else {
                        console.log("oiii");
                        
                        return message.ERROR_NOT_FOUND
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {

            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER
    }

}
const getListarUsuarios = async function () {
    let usuariosJSON = {};
    let dadosUsuarios = await usuarioDao.selectAllUsuarios();

    if (dadosUsuarios) {
        if (dadosUsuarios.length > 0) {
                let dataFormatada;
                let cont=0;
                while (cont<dadosUsuarios.length) {                    
                 dataFormatada = await validacoes.validateReturnData(dadosUsuarios[cont].data_nascimento)
                dadosUsuarios[cont].data_nascimento = dataFormatada
                cont++
                }
            usuariosJSON.usuarios = dadosUsuarios;
            usuariosJSON.quantidade = dadosUsuarios.length;
            usuariosJSON.status_code = 200;

            return usuariosJSON;
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB;
    }
}
const getBuscarUsuarioById = async function (id) {
    console.log("aqiu");
    
    let idUsuario = id
    let usuarioJSON = {}
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID;
    } else {
        let dadosUsuario = await usuarioDao.selectByIdUsuario(idUsuario);
        
        if (dadosUsuario) {
            if (dadosUsuario.length > 0) {
                    let dataFormatada = await validacoes.validateReturnData(dadosUsuario[0].data_nascimento)
                    dadosUsuario[0].data_nascimento =  dataFormatada
               

                usuarioJSON.usuario = dadosUsuario[0];
                usuarioJSON.status_code = 200;
                return usuarioJSON
            } else {
                return message.ERROR_NOT_FOUND; 
            }
        } else {
            
            return message.ERROR_INTERNAL_SERVER_DB; 
        }
    }
}
const getBuscarUsuarioNome = async (nome) => {
    
    let nomeUsuario = nome
    let usuariosJSON = {};
    if (nomeUsuario == '' || nomeUsuario == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosUsuarios = await usuarioDao.selectbyNameUsuario(nomeUsuario)
        
        if (dadosUsuarios) {
            if (dadosUsuarios.length > 0) {
                let dataFormatada;
                let cont=0;
                while (cont<dadosUsuarios.length) {                    
                 dataFormatada = await validacoes.validateReturnData(dadosUsuarios[cont].data_nascimento)
                dadosUsuarios[cont].data_nascimento = dataFormatada
                cont++
                }
                
                usuariosJSON.usuarios = dadosUsuarios;
                usuariosJSON.status_code = 200;

                return usuariosJSON
            } else {
                return message.ERROR_NOT_FOUND;
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
}
const setInserirUsuarioV2 = async function (dadosUsuario, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoUsuarioJSON = {}

            if (
                dadosUsuario.nome == '' || dadosUsuario.nome == undefined || dadosUsuario.nome == null || dadosUsuario.nome.length > 255 ||
                dadosUsuario.email == "" || dadosUsuario.email == undefined || dadosUsuario.email == null || dadosUsuario.email.length > 255 ||
                dadosUsuario.senha == "" || dadosUsuario.senha == undefined || dadosUsuario.senha == null || dadosUsuario.senha.length > 8 ||
                dadosUsuario.data_nascimento == "" || dadosUsuario.data_nascimento == undefined || dadosUsuario.data_nascimento == null || dadosUsuario.data_nascimento.length != 10
            ) {
                return message.ERROR_REQUIRED_FIELDS
            }
            let validateStatus = false
                    if (dadosUsuario.foto_perfil != null &&
                        dadosUsuario.foto_perfil != '' &&
                        dadosUsuario.foto_perfil != undefined) {
                        if (dadosUsuario.foto_perfil.length >200) {
                            return message.ERROR_REQUIRED_FIELDS
                        }
                        else {
                            validateStatus = true
                        }
                    }
                    else {
                        validateStatus = true
                    }
                    let validateStatusTelefone = false
                    if (dadosUsuario.telefone != null &&
                        dadosUsuario.telefone != '' &&
                        dadosUsuario.telefone != undefined) {
                        if (dadosUsuario.telefone.length >200) {
                            return message.ERROR_REQUIRED_FIELDS
                        }
                        else {
                            validateStatusTelefone = true
                        }
                    }
                    else {
                        validateStatusTelefone = true
                    }

                    if (validateStatus&&validateStatusTelefone) {

            let dataFormatada = await validacoes.validateInsertDataNascimento(dadosUsuario.data_nascimento)
            dadosUsuario.data_nascimento = dataFormatada
            
            let validacaoEmail = await usuarioDao.selectVerificarEmail(dadosUsuario.email)
            if (validacaoEmail == '') {
                const hash = await argon2.hash(dadosUsuario.senha);
                dadosUsuario.senha = hash

                let novoUsuario = await usuarioDao.insertUsuarioV2(dadosUsuario)
                if (novoUsuario) {
                    let ultimoID = await usuarioDao.getIDUsuario()
                    dadosUsuario.id_usuario = Number(ultimoID[0].id_Usuario)
                }

                if (novoUsuario) {
                    
                    let dataFormatada = await validacoes.validateReturnData(dadosUsuario.data_nascimento)
                    dadosUsuario.data_nascimento = dataFormatada
                    novoUsuarioJSON.usuario = dadosUsuario
                    novoUsuarioJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoUsuarioJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoUsuarioJSON.message = message.SUCESS_CREATED_ITEM.message

                    return novoUsuarioJSON
                } else {
                    
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_CONFLIT_EMAIL
            }
        } else {
console.log('oi');

            return message.ERROR_INTERNAL_SERVER
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
console.log(error);

        return message.ERROR_INTERNAL_SERVER

    }
}
const setInserirUsuario = async function (dadosUsuario, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoUsuarioJSON = {}

            if (
                dadosUsuario.nome == '' || dadosUsuario.nome == undefined || dadosUsuario.nome == null || dadosUsuario.nome.length > 255 ||
                dadosUsuario.email == "" || dadosUsuario.email == undefined || dadosUsuario.email == null || dadosUsuario.email.length > 255 ||
                dadosUsuario.senha == "" || dadosUsuario.senha == undefined || dadosUsuario.senha == null || dadosUsuario.senha.length > 8 ||
                dadosUsuario.data_nascimento == "" || dadosUsuario.data_nascimento == undefined || dadosUsuario.data_nascimento == null || dadosUsuario.data_nascimento.length != 10
            ) {
                return message.ERROR_REQUIRED_FIELDS
            }
            let validateStatus = false
                    if (dadosUsuario.foto_perfil != null &&
                        dadosUsuario.foto_perfil != '' &&
                        dadosUsuario.foto_perfil != undefined) {
                        if (dadosUsuario.foto_perfil.length >200) {
                            return message.ERROR_REQUIRED_FIELDS
                        }
                        else {
                            validateStatus = true
                        }
                    }
                    else {
                        validateStatus = true
                    }
                    let validateStatusTelefone = false
                    if (dadosUsuario.telefone != null &&
                        dadosUsuario.telefone != '' &&
                        dadosUsuario.telefone != undefined) {
                        if (dadosUsuario.telefone.length >200) {
                            return message.ERROR_REQUIRED_FIELDS
                        }
                        else {
                            validateStatusTelefone = true
                        }
                    }
                    else {
                        validateStatusTelefone = true
                    }

                    if (validateStatus&&validateStatusTelefone) {

            let dataFormatada = await validacoes.validateInsertDataNascimento(dadosUsuario.data_nascimento)
            dadosUsuario.data_nascimento = dataFormatada
            
            let validacaoEmail = await usuarioDao.selectVerificarEmail(dadosUsuario.email)
            if (validacaoEmail == '') {
                let novoUsuario = await usuarioDao.insertUsuario(dadosUsuario)
                if (novoUsuario) {
                    let ultimoID = await usuarioDao.getIDUsuario()
                    dadosUsuario.id_usuario = Number(ultimoID[0].id_Usuario)
                }

                if (novoUsuario) {
                    
                    let dataFormatada = await validacoes.validateReturnData(dadosUsuario.data_nascimento)
                    dadosUsuario.data_nascimento = dataFormatada
                    novoUsuarioJSON.usuario = dadosUsuario
                    novoUsuarioJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoUsuarioJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoUsuarioJSON.message = message.SUCESS_CREATED_ITEM.message

                    return novoUsuarioJSON
                } else {
                    
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_CONFLIT_EMAIL
            }
        } else {
console.log('oi');

            return message.ERROR_INTERNAL_SERVER
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    } catch (error) {
console.log(error);

        return message.ERROR_INTERNAL_SERVER

    }
}
const setAtualizarUsuario = async function (id, dadoAtualizado, contentType) {
    let idUsuario = id

    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID;
    } else {
        let result = await usuarioDao.selectByIdUsuario(idUsuario)
        let verificarId = result.length
        if (verificarId > 0) {
            try {

                if (String(contentType).toLowerCase() == 'application/json') {

                    let updateUsuarioJSON = {}

                    if (
                        dadoAtualizado.nome == '' || dadoAtualizado.nome == undefined || dadoAtualizado.nome == null || dadoAtualizado.nome.length > 255||
                        dadoAtualizado.email == '' || dadoAtualizado.email == undefined || dadoAtualizado.email == null || dadoAtualizado.email.length > 255
                    ) {
                        return message.ERROR_REQUIRED_FIELDS
                    }
                    let validateStatus = false
                    if (dadoAtualizado.foto_perfil != null &&
                        dadoAtualizado.foto_perfil != '' &&
                        dadoAtualizado.foto_perfil != undefined) {
                        if (dadoAtualizado.foto_perfil.length >200) {
                            return message.ERROR_REQUIRED_FIELDS
                        }
                        else {
                            validateStatus = true
                        }
                    }
                    else {
                        validateStatus = true
                    }
                    let validateStatusTelefone = false
                    if (dadoAtualizado.telefone != null &&
                        dadoAtualizado.telefone != '' &&
                        dadoAtualizado.telefone != undefined) {
                        if (dadoAtualizado.telefone.length >200) {
                            return message.ERROR_REQUIRED_FIELDS
                        }
                        else {
                            validateStatusTelefone = true
                        }
                    }
                    else {
                        validateStatusTelefone = true
                    }

                    if (validateStatus&&validateStatusTelefone) {

                        let dataFormatada = await validacoes.validateInsertDataNascimento(dadoAtualizado.data_nascimento)
                        if(dataFormatada.includes("-")){
                        dadoAtualizado.data_nascimento = dataFormatada
                        let validacaoEmail = await usuarioDao.selectVerificarEmail(dadoAtualizado.email)
                        if (validacaoEmail == '') {
                            let usuarioAtualizado = await usuarioDao.updateUsuario(id, dadoAtualizado)
                            if (usuarioAtualizado) {
                                updateUsuarioJSON.usuario = dadoAtualizado
                                updateUsuarioJSON.status = message.SUCESS_UPDATED_ITEM.status
                                updateUsuarioJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                                updateUsuarioJSON.message = message.SUCESS_UPDATED_ITEM.message

                                return updateUsuarioJSON
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB  
                            }
                        }
                        else {
                            return message.ERROR_CONFLIT_EMAIL
                        }
                    }else{
                        return dataFormatada
                    }
                    } else {
                        return message.ERROR_INTERNAL_SERVER
                    }

                } else {
                    return message.ERROR_CONTENT_TYPE
                }
            } catch (error) {

                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_NOT_FOUND_ID
        }
    }

}

const setAtualizarSenhaUsuario = async function (id, dadoAtualizado, contentType) {
    let idUsuario = id
    console.log(id);
    
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID;
    } else {
        let result = await usuarioDao.selectByIdUsuario(idUsuario)
        let verificarId = result.length
        if (verificarId > 0) {
            try {

                if (String(contentType).toLowerCase() == 'application/json') {

                    let updateUsuarioJSON = {}

                    if (
                        dadoAtualizado.senha == '' || dadoAtualizado.senha == undefined || dadoAtualizado.senha == null || dadoAtualizado.senha.length > 255
                    ) {
                        return message.ERROR_REQUIRED_FIELDS
                    }
                    
                        // let validacaoEmail = await usuarioDao.selectVerificarEmail(dadoAtualizado.email)
                        // if (validacaoEmail == '') {
                            let usuarioAtualizado = await usuarioDao.updateSenhaUsuario(id, dadoAtualizado.senha)
                            if (usuarioAtualizado) {
                                updateUsuarioJSON.status = message.SUCESS_UPDATED_ITEM.status
                                updateUsuarioJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                                updateUsuarioJSON.message = message.SUCESS_UPDATED_ITEM.message

                                return updateUsuarioJSON
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB  
                            }
                        // }
                        // else {
                        //     return message.ERROR_CONFLIT_EMAIL
                        // }
                
                    
                } else {
                    return message.ERROR_CONTENT_TYPE
                }
            } catch (error) {
console.log(error);

                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_NOT_FOUND_ID
        }
    }

}
const setExcluirUsuario = async function (id) {
    let idUsuario = id
    try {
        if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let dadosUsuario = await usuarioDao.selectByIdUsuario(idUsuario);

            let verificarId = dadosUsuario.length
            if (verificarId > 0) {
            
                dadosUsuario = await usuarioDao.deleteUsuario(idUsuario)
                if (dadosUsuario) {
                    updateUsuarioJSON.status = message.SUCESS_DELETED_ITEM.status
                    updateUsuarioJSON.status_code = message.SUCESS_DELETED_ITEM.status_code
                    updateUsuarioJSON.message = message.SUCESS_DELETED_ITEM.message

                    return updateUsuarioJSON
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB  
                }
            } else {
                return message.ERROR_NOT_FOUND_ID
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}
const getBuscarFavoritosUsuarioById = async function (id) {
    let idUsuario = id
    let usuarioJSON = {}
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID;
    } else {
        let dadosUsuario = await usuarioDao.selectByIdUsuario(idUsuario);
        if (dadosUsuario) {
            if (dadosUsuario.length > 0) {                    
                usuarioJSON.favoritos = dadosUsuario[0];
                usuarioJSON.status_code = 200;
                return usuarioJSON
            } else {
                return message.ERROR_NOT_FOUND; 
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB; 
        }
    }
}







module.exports = {
    getListarUsuarios,//usando
    getBuscarUsuarioById,//usando
    getBuscarUsuarioNome,//usando
    getBuscarFavoritosUsuarioById,
    setInserirUsuario,//usando
    setAtualizarUsuario,//usando
    setExcluirUsuario,//usando
    getValidarUsuario,
    setAtualizarSenhaUsuario,
    setInserirUsuarioV2
}