/**************************************************************************************************
 * Objetivo: Arquivo responável pela padronizção de variáveis globais utilizadas no projeto
 * Data: 02/2025
 * Autor:Letícia Melo Silva
 * Versão 1.0
 ************************************************************************************************/

/**********************Mensagens de ERROS *****************************/ 

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!'};
const ERROR_INVALID_DATE = {status: false, status_code: 400, message: 'A data preenchida não é válida!!'};
const ERROR_NOT_ENOUGH_YEARS = {status: false, status_code: 400, message: 'A idade mínima para acessar essa aplicação é 10 anos!!'};
const ERROR_REQUIRED_FIELDS = {status :false, status_code: 400, message: 'Existem campos requiridos que não foram preenchidos, ou que não atende ao critério da digitação.'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados item na requisição!!'};
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido ao um problema na comunicação com o Banco de Dados. Contate o ADM da API !!'};
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido ao um problema na camada de negócio/controle da aplicação. Contate o ADM da API !!'};
const ERROR_NOT_FOUND_ID = {status: false, status_code: 404, message: 'Não foi encontrado o ID  na requisição!!'};
const ERROR_CONTENT_TYPE = { status: false, status_code: 415, message: 'O content-type encaminhado na requisição não é suportado pelo servidor. Deve-se encaminhar apenas requisções com application/json !!'};
const ERROR_CONFLIT_EMAIL = {status: false, status_code: 422, message: 'Não foi possível processar sua solicitação: o email informado já existe!!'};

/**********************Mensagens de SUCESSO *****************************/ 
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso !!'};
const SUCESS_UPDATED_ITEM = {status: true, status_code: 201, message: 'Item atualizado com sucesso !!'};
const SUCESS_DELETED_ITEM = {status: true, status_code:200, message: 'Item deletado com sucesso !!'}
const SUCESS_VALIDATED_ITEM = {status: true, status_code:200, message: 'Usuário validado com sucesso!!'}



module.exports = { 
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCESS_DELETED_ITEM,
    ERROR_NOT_FOUND_ID,
    SUCESS_UPDATED_ITEM,
    SUCESS_VALIDATED_ITEM,
    ERROR_CONFLIT_EMAIL,
    ERROR_INVALID_DATE,
    ERROR_NOT_ENOUGH_YEARS
}