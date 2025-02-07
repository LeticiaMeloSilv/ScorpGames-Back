/**************************************************
 * objetivo: crud Classificacao indicativa
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertClassificacao = async function (dadosClassificacao) {
    let sql;
    try {
        sql = `insert into tbl_classificacao_indicativa (foto_classificacao,texto_classificacao) 
            values(
                '${dadosClassificacao.foto_classificacao}',
                '${dadosClassificacao.texto_classificacao}'
                )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
const updateClassificacao = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_classificacao_indicativa
                SET
            foto_classificacao='${dadoAtualizado.foto_classificacao}'
            texto_classificacao='${dadoAtualizado.texto_classificacao}'
                WHERE
                    id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao_indicativa where id = ${id}`
        let rsClassificacao_indicativa = await prisma.$executeRawUnsafe(sql)
        return rsClassificacao_indicativa
    } catch (error) {
        return false
    }
}