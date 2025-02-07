/**************************************************
 * objetivo: crud tipos de denuncia
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertTipoDenuncia = async function (dadosTipoDenuncia) {
    let sql;
    try {
        if(dadosTipoDenuncia.id_usuario!=null&&dadosTipoDenuncia.id_usuario!=''&&dadosTipoDenuncia.id_usuario!=undefined){
        sql = `insert into tbl_tipos_denuncia (id_denunciante,motivo,id_tipo, id_usuario) 
            values(
                '${dadosTipoDenuncia.id_denunciante}',
                '${dadosTipoDenuncia.motivo}',
                                '${dadosTipoDenuncia.tipo}',
                '${dadosTipoDenuncia.id_usuario}'
                )`
            }
            else{
                sql = `insert into tbl_tipos_denuncia (id_denunciante,motivo,id_tipo, id_usuario) 
            values(
                '${dadosTipoDenuncia.id_denunciante}',
                '${dadosTipoDenuncia.motivo}',
                                '${dadosTipoDenuncia.tipo}',
                null
                )`
            }
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
const updateTipoDenuncia = async function (id, dadoAtualizado) {
    let sql;

    try {
        if(dadoAtualizado.id_usuario!=null&&dadoAtualizado.id_usuario!=''&&dadoAtualizado.id_usuario!=undefined){
        sql = `UPDATE tbl_tipos_denuncia
                SET
                    id_denunciante = '${dadoAtualizado.id_denunciante}',
            motivo='${dadoAtualizado.motivo}',
                        id_tipo='${dadoAtualizado.id_tipo}',
            id_usuario= '${dadoAtualizado.id_usuario}'
                WHERE
                    id = ${id}`
                }else{
                    sql = `UPDATE tbl_tipos_denuncia
                    SET
                        id_denunciante = '${dadoAtualizado.id_denunciante}',
                motivo='${dadoAtualizado.motivo}',
                            id_tipo='${dadoAtualizado.id_tipo}',
                id_usuario= null
                    WHERE
                        id = ${id}`
                    }

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
const deleteTipoDenuncia = async function (id) {
    try {
        let sql = `delete from tbl_tipos_denuncia where id = ${id}`
        let rsDenuncia = await prisma.$executeRawUnsafe(sql)
        return rsDenuncia
    } catch (error) {
        return false
    }
}
const selectAllTiposDenuncia = async function () {
    try {
        let sql = 'select * from tbl_tipos_denuncia'
        let rstipos_denuncia = await prisma.$queryRawUnsafe(sql)
        return rstipos_denuncia
    } catch (error) {
        return false
    }
}