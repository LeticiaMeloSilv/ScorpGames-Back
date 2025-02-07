/**************************************************
 * objetivo: crud Chats
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertChat = async function (dadosChat) {
    let sql;
    try {
        sql = `insert into tbl_chats (id_jogo,mensagem,id_usuario,data_envio) 
            values(
                '${dadosChat.id_jogo}',
                '${dadosChat.mensagem}',
                '${dadosChat.id_usuario}',
                '${dadosChat.data_envio}'
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
const updateChat = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_chats
                SET
            mensagem='${dadoAtualizado.mensagem}'
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
const deleteChat = async function (id) {
    try {
        let sql = `delete from tbl_chats where id = ${id}`
        let rsChat = await prisma.$executeRawUnsafe(sql)
        return rsChat
    } catch (error) {
        return false
    }
}
const selectChatDoJogo = async function (id_jogo) {
    try {
        let sql = `select tbl_chats.*,tbl_usuarios.nome, tbl_usuarios.id_usuario, tbl_usuarios.foto_perfil from tbl_chats join tbl_usuarios on  
tbl_chats.id_usuario = tbl_usuarios.id_usuario
where tbl_chats.id_jogo= ${id_jogo};`
        let rsJogo = await prisma.$queryRawUnsafe(sql)
        return rsJogo
    } catch (error) {
        return false

    }
}
