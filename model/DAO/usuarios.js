/**************************************************
 * objetivo: crud usuarios
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertUsuario = async function (dadosUsuario) {
    let sql;
    try {
        if (dadosUsuario.foto_perfil != '' && dadosUsuario.foto_perfil != null && dadosUsuario.foto_perfil != undefined && dadosUsuario.telefone != '' && dadosUsuario.telefone != null && dadosUsuario.telefone != undefined) {
            sql = `insert into tbl_usuarios (nome,email,telefone,data_nascimento,foto_perfil,ativo) 
            values(
                '${dadosUsuario.nome}',
                '${dadosUsuario.email}',
                '${dadosUsuario.telefone}',
                '${dadosUsuario.data_nascimento}',
                '${dadosUsuario.foto_perfil}',
                '${1}'
            )`
        }
        else if (dadosUsuario.telefone == '' || dadosUsuario.telefone == null || dadosUsuario.telefone == undefined) {
            sql = `insert into tbl_usuarios (nome,email,telefone,data_nascimento,foto_perfil,ativo) 
            values(
                '${dadosUsuario.nome}',
                '${dadosUsuario.email}',
                null,
                '${dadosUsuario.data_nascimento}',
                '${dadosUsuario.foto_perfil}',
                '${1}'
            )`

        }
        else if (dadosUsuario.foto_perfil == '' || dadosUsuario.foto_perfil == null || dadosUsuario.foto_perfil == undefined) {
            sql = `insert into tbl_usuarios (nome,email,telefone,data_nascimento,foto_perfil,ativo) 
            values(
                '${dadosUsuario.nome}',
                '${dadosUsuario.email}',
                '${dadosUsuario.telefone}',
                '${dadosUsuario.data_nascimento}',
                null,
                '${1}'
            )`
        }
        else{
            sql = `insert into tbl_usuarios (nome,email,telefone,data_nascimento,foto_perfil,ativo) 
            values(
                '${dadosUsuario.nome}',
                '${dadosUsuario.email}',
                null,
                '${dadosUsuario.data_nascimento}',
                null,
                '${1}'
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
        console.log(error);
        return false
    }
}

const insertSenha = async function (dadosUsuario) {
    let sql;
    
    try {
        sql = `insert into tbl_autentificacao(senha, senha_ativa ,id_usuario)
        values(
            '${dadosUsuario.senha}',
            '${dadosUsuario.senha_ativa}',
            '${Number(dadosUsuario.id_usuario)}'
        )`
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
const updateUsuario = async function (id, dadoAtualizado) {
    let sql;
    try {
        if (dadoAtualizado.foto_perfil != '' && dadoAtualizado.foto_perfil != null && dadoAtualizado.foto_perfil != undefined && dadosUsuario.telefone != '' && dadosUsuario.telefone != null && dadosUsuario.telefone != undefined) {
            sql = `UPDATE tbl_usuarios
            SET
                nome = '${dadoAtualizado.nome}',
                email = '${dadoAtualizado.email}',
                telefone='${dadoAtualizado.telefone}',
                data_nascimento= '${dadoAtualizado.data_nascimento}',
                foto_perfil='${dadoAtualizado.foto_perfil}'
            WHERE id_usuario = ${id}`
        }
        else if (dadoAtualizado.telefone == '' || dadoAtualizado.telefone == null || dadoAtualizado.telefone == undefined) {
            sql = `UPDATE tbl_usuarios
            SET
                nome = '${dadoAtualizado.nome}',
                email = '${dadoAtualizado.email}',
                telefone=null,
                data_nascimento= '${dadoAtualizado.data_nascimento}',
                foto_perfil='${dadoAtualizado.foto_perfil}'
            WHERE id_usuario = ${id}`
        }
        else if (dadoAtualizado.foto_perfil == '' || dadoAtualizado.foto_perfil == null || dadoAtualizado.foto_perfil == undefined) {
            sql = `UPDATE tbl_usuarios
            SET
                nome = '${dadoAtualizado.nome}',
                email = '${dadoAtualizado.email}',
                telefone='${dadoAtualizado.telefone}',
                data_nascimento= '${dadoAtualizado.data_nascimento}',
                foto_perfil=null
            WHERE id_usuario = ${id}`
        }
        else{
            sql = `UPDATE tbl_usuarios
            SET
                nome = '${dadoAtualizado.nome}',
                email = '${dadoAtualizado.email}',
                telefone='${dadoAtualizado.telefone}',
                data_nascimento= '${dadoAtualizado.data_nascimento}',
                foto_perfil=null
            where id_usuario = ${id}`
        }
        let result = await prisma.$executeRawUnsafe(sql)        
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
const updateSenha = async function (id) {
    let sql;
    try {
        sql = `UPDATE tbl_autentificacao
        SET
            senha_ativa = false
        WHERE id_usuario = ${id} and senha_ativa=true`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
        
        return false
    }
}
const deleteUsuario = async function (id) {
    try {        
        
        let sql = `DELETE u, a
FROM tbl_autentificacao u
JOIN tbl_usuarios a ON a.id_usuario=u.id_usuario
WHERE u.id_usuario = ${id}`
        let rsUsuario = await prisma.$executeRawUnsafe(sql)
        
        return rsUsuario
    } catch (error) {
        console.log(error);
        
        return false
    }
}//feito
const deleteSenha = async function (id) {
    try {        
        
        let sql = `delete from tbl_autentificacao where id_usuario = ${id}`
        let rsUsuario = await prisma.$executeRawUnsafe(sql)
        
        return rsUsuario
    } catch (error) {
        console.log(error);
        
        return false
    }
}//feito
const selectAllUsuarios = async function () {
    try {
        let sql = 'select * from tbl_usuarios'
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios
    } catch (error) {
        return false
    }
}//feito
const selectbyNameUsuario = async function (nome) {
    try {
        
        let sql = `select * from tbl_usuarios where nome like'%${nome}%'`
        
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario


    } catch (error) {
        
        return false

    }

}//feito
const selectByIdUsuario = async function (id) {
    try {
        let sql = `select * from tbl_usuarios where id_usuario=${id}`
        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        
        return rsUsuario
    } catch (error) {
        
        return false
    }
}//feito
const selectByEmailUsuario = async function (email) {
    try {
        let sql = `select * from tbl_usuarios join tbl_autentificacao on tbl_usuarios.id_usuario=tbl_autentificacao.id_usuario where email='${email}' and tbl_autentificacao.senha_ativa=1;`
        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        console.log(rsUsuario);
        
        if (rsUsuario) {
            
            return rsUsuario
        }
        else{
            return false
        }
    } catch (error) {
        console.log(error);
        
        return false
    }
}
const getIDUsuario = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_usuarios limit 1;`
        let rsUsuario = await prisma.$queryRawUnsafe(sql_id)
        return rsUsuario
    } catch (error) {
        return false
    }

}//feito
// const selectValidarUsuario = async function (email, senha) {
//     let sql = `select * from tbl_usuarios where email = '${email}' and senha = md5('${senha}')`
//     let rsUsuario = await prisma.$queryRawUnsafe(sql)
//     console.log(rsUsuario);
    
//     if (rsUsuario) {
//         return rsUsuario
//     } else {
//         return false
//     }
// }//feito
const selectVerificarEmail = async function (email) {
    try {
        
        let sql = `select email from tbl_usuarios where email = '${email}';`
        
        let rsAluno = await prisma.$queryRawUnsafe(sql)
        
            if (rsAluno) {
                
                return rsAluno
            } else {
                
                return false
            }
    } catch (error) {
        console.log(error);
        
        return false
    }

}//feito
const selectJogosFavoritosByID = async function (id) {
    try {
        let sql = `SELECT tbl_jogos.*, tbl_salvos.id_salvo 
            FROM tbl_jogos
                JOIN tbl_salvos ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
                JOIN tbl_usuarios ON tbl_salvos.id_usuario = tbl_usuarios.id_usuario
            WHERE tbl_salvos.estado = TRUE 
            AND tbl_usuarios.id_usuario=${id}`
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario

    } catch (error) {
        return false

    }

}

module.exports = {
    insertUsuario,
    insertSenha,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectbyNameUsuario,
    selectByIdUsuario,
    getIDUsuario,
    selectVerificarEmail,
    selectJogosFavoritosByID,
    updateSenha,
    selectByEmailUsuario,
    deleteSenha
}