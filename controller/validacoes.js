/**************************************************
 * objetivo: validaçoes que se repetem
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */
const data = new Date();
const dataAtual = data.toLocaleDateString('pt-BR');

const message = require('../modulo/config.js')

const partesAtuais = dataAtual.split('/');
const diaAtual = partesAtuais[0];
const mesAtual = partesAtuais[1];
const anoAtual = partesAtuais[2];

const validateInsertDataNascimento = async function (dataInserida) {

    const partesInseridas = dataInserida.split('/');
    const diaInserido = partesInseridas[0];
    const mesInserido = partesInseridas[1];
    const anoInserido = partesInseridas[2];

    if (anoInserido > anoAtual || anoAtual - anoInserido == 200) {

        return message.ERROR_INVALID_DATE
    }
    else if (anoAtual - 10 < anoInserido) {

        return message.ERROR_NOT_ENOUGH_YEARS
    }
    else {
        return `${anoInserido}-${mesInserido}-${diaInserido}`
    }
}
const validateInsertDataLancamento = async function (dataInserida) {

    const partesInseridas = dataInserida.split('/');
    const diaInserido = partesInseridas[0];
    const mesInserido = partesInseridas[1];
    const anoInserido = partesInseridas[2];

    if (anoInserido > anoAtual) {
        return message.ERROR_INVALID_DATE
    }
    else {
        return `${anoInserido}-${mesInserido}-${diaInserido}`
    }
}

const validateReturnData = async function (data) {

    let partesRecebidas;
    try {
        partesRecebidas = data.toISOString().split('T')[0]

    } catch (error) {
        partesRecebidas = data.toString().split('T')[0]

    }

    const partesInseridas = partesRecebidas.split('-');
    const dia = partesInseridas[2];
    const mes = partesInseridas[1];
    const ano = partesInseridas[0];

    return `${dia}/${mes}/${ano}`

}

module.exports = {
    validateReturnData,
    validateInsertDataLancamento,
    validateInsertDataNascimento
}