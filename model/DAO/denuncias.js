/**************************************************
 * objetivo: crud Denuncias
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertDenuncia = async function (dadosDenuncia) {
    let sql;
    try {
        if(dadosDenuncia.id_usuario!=null&&dadosDenuncia.id_usuario!=''&&dadosDenuncia.id_usuario!=undefined){
        sql = `insert into tbl_denuncias (id_denunciante,motivo,id_tipo, id_usuario) 
            values(
                '${dadosDenuncia.id_denunciante}',
                '${dadosDenuncia.motivo}',
                                '${dadosDenuncia.id_tipo}',
                '${dadosDenuncia.id_usuario}'
                )`
            }
            else{
                sql = `insert into tbl_denuncias (id_denunciante,motivo,id_tipo, id_usuario) 
            values(
                '${dadosDenuncia.id_denunciante}',
                '${dadosDenuncia.motivo}',
                                '${dadosDenuncia.id_tipo}',
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
const updateDenuncia = async function (id, dadoAtualizado) {
    let sql;

    try {
        if(dadosDenuncia.id_usuario!=null&&dadosDenuncia.id_usuario!=''&&dadosDenuncia.id_usuario!=undefined){
        sql = `UPDATE tbl_denuncias
                SET
                    id_denunciante = '${dadoAtualizado.id_denunciante}',
            motivo='${dadoAtualizado.motivo}',
                        id_tipo='${dadoAtualizado.id_tipo}',
            id_usuario= '${dadoAtualizado.id_usuario}'
                WHERE
                    id = ${id}`
                }else{
                    sql = `UPDATE tbl_denuncias
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
const deleteDenuncia = async function (id) {
    try {
        let sql = `delete from tbl_denuncias where id = ${id}`
        let rsDenuncia = await prisma.$executeRawUnsafe(sql)
        return rsDenuncia
    } catch (error) {
        return false
    }
}
const selectAllDenuncias = async function () {
    try {
        let sql = 'select * from tbl_denuncias'
        let rsDenuncias = await prisma.$queryRawUnsafe(sql)
        return rsDenuncias
    } catch (error) {
        return false
    }
}
const selectDenunciasSoftware = async function () {
    try {
        let sql = 'select * from tbl_denuncias where id_usuario is null;'
        let rsDenuncias = await prisma.$queryRawUnsafe(sql)
        return rsDenuncias
    } catch (error) {
        return false
    }
}
const selectDenunciasFeitasPeloUsuario = async function (id) {
    try {
        let sql = `select * from tbl_denuncias where id_usuario=${id};`
        let rsDenuncias = await prisma.$queryRawUnsafe(sql)
        return rsDenuncias
    } catch (error) {
        return false
    }
}
const selectDenunciasFeitasParaUsuario = async function (id) {
    try {
        let sql = `select * from tbl_denuncias where id_denunciante=${id};`
        let rsDenuncias = await prisma.$queryRawUnsafe(sql)
        return rsDenuncias
    } catch (error) {
        return false
    }
}
const selectUsuariosDesativados = async function () {
    try {
        let sql = `select * from tbl_usuarios where ativo=false;`
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario


    } catch (error) {
        return false

    }

}
const updateUsuarioDesativado = async function (id) {
    let sql;

    try {

        sql = `update tbl_usuarios set
            ativo =  not ativo
            where tbl_usuarios.id_usuario = ${id};`

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
const selectbyTipoDenuncia = async function (id_tipo) {
    try {
        let sql = `select * from tbl_denuncias where id_tipo =${id_tipo}`
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario


    } catch (error) {
        return false

    }

}