/**************************************************
 * objetivo: crud jogos
 * data: 02/2025
 * autor: Letícia Melo Silva
 * versão 1.0
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertJogo = async function (dadosJogo) {
    let sql;
    try {
        sql = `insert into tbl_jogos (nome,descricao,data_lancamento,foto_capa,id_classificacao) 
            values(
                '${dadosJogo.nome}',
                '${dadosJogo.descricao}',
                '${dadosJogo.data_lancamento}',
                '${dadosJogo.foto_capa}',
                '${dadosJogo.id_classificacao}'
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
const updateJogo = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_jogos
                SET
                    nome = '${dadoAtualizado.nome}',
            descricao='${dadoAtualizado.descricao}',
            data_lancamento= '${dadoAtualizado.data_lancamento}',
            foto_capa='${dadoAtualizado.foto_capa}',
            id_classificacao ='${dadosJogo.id_classificacao}'
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
const deleteJogo = async function (id) {
    try {
        let sql = `delete from tbl_jogos where id = ${id}`
        let rsJogo = await prisma.$executeRawUnsafe(sql)
        return rsJogo
    } catch (error) {
        return false
    }
}
const selectAllJogos = async function () {
    try {
        let sql = 'select * from tbl_jogos'
        let rsJogos = await prisma.$queryRawUnsafe(sql)
        return rsJogos
    } catch (error) {
        return false
    }
}
const selectAllJogosFamosos = async function () {
    try {
        let sql = `
        SELECT tbl_jogos.*, COUNT(tbl_salvos.id_jogo) AS total_favoritos
FROM tbl_jogos
JOIN tbl_salvos ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
WHERE tbl_salvos.estado = TRUE
GROUP BY tbl_jogos.id_jogo
ORDER BY total_favoritos DESC;
`
        let rsJogos = await prisma.$queryRawUnsafe(sql)
        return rsJogos
    } catch (error) {
        return false
    }
}
const selectAllJogosFamososComSalvoUsuario = async function (id_usuario) {
    try {
        let sql = `SELECT 
    tbl_jogos.*, 
    COUNT(tbl_salvos.id_jogo) AS total_favoritos,
    CASE 
        WHEN MAX(tbl_usuario_salvou.id_salvo) IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS salvo,
    MAX(tbl_usuario_salvou.id_salvo) AS id_salvo 
FROM tbl_jogos

LEFT JOIN tbl_salvos AS tbl_salvos
    ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
    AND tbl_salvos.estado = TRUE

LEFT JOIN tbl_salvos AS tbl_usuario_salvou
    ON tbl_jogos.id_jogo = tbl_usuario_salvou.id_jogo
    AND tbl_usuario_salvou.id_usuario = ${id_usuario}
    AND tbl_usuario_salvou.estado = TRUE

GROUP BY tbl_jogos.id_jogo
ORDER BY total_favoritos DESC;`
        let rsJogos = await prisma.$queryRawUnsafe(sql)
        return rsJogos
    } catch (error) {
        return false
    }
}
const selectbyNameJogoComSalvoUsuario = async function (nome, id_usuario) {
    try {
        let sql = `SELECT 
    tbl_jogos.*, 
    CASE 
        WHEN tbl_salvos.id_salvo IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS salvo,
    MAX(tbl_usuario_salvou.id_salvo) AS id_salvo 
FROM tbl_jogos
LEFT JOIN tbl_salvos 
    ON tbl_jogos.id_jogo = tbl_salvos.id_jogo 
    AND tbl_salvos.id_usuario = ${id_usuario}
WHERE tbl_jogos.nome LIKE '%${nome}%'`
        let rsJogo = await prisma.$queryRawUnsafe(sql)
        return rsJogo
    } catch (error) {
        return false

    }

}
const selectByIdJogoComSalvoUsuario = async function (id_jogo, id_usuario) {
    try {
        let sql = `SELECT 
    tbl_jogos.*, 
    CASE 
        WHEN tbl_salvos.id_salvo IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS salvo,
    MAX(tbl_usuario_salvou.id_salvo) AS id_salvo 
FROM tbl_jogos
LEFT JOIN tbl_salvos 
    ON tbl_jogos.id_jogo = tbl_salvos.id_jogo 
    AND tbl_salvos.id_usuario = ${id_usuario}
WHERE tbl_jogos.id_jogo LIKE '%${id_jogo}%'`
        let rsJogo = await prisma.$queryRawUnsafe(sql)
        return rsJogo
    } catch (error) {
        return false
    }
}
const getIDJogo = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_jogos limit 1;`
        let rsJogo = await prisma.$queryRawUnsafe(sql_id)
        return rsJogo
    } catch (error) {
        return false
    }

}
const selectJogosSalvosUsuarioByID = async function (id_usuario) {
    try {
        let sql = `SELECT tbl_jogos.*, tbl_salvos.id_salvo 
FROM tbl_jogos
JOIN tbl_salvos ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
JOIN tbl_usuarios ON tbl_salvos.id_usuario = tbl_usuarios.id_usuario
WHERE tbl_salvos.estado = TRUE 
AND tbl_usuarios.id_usuario = ${id_usuario};`
        let rsJogo = await prisma.$queryRawUnsafe(sql)
        return rsJogo
    } catch (error) {
        return false

    }
}
const insertSalvo = async function (id_usuario, id_jogo) {
    let sql;

    try {
        sql = `INSERT INTO tbl_salvos (id_usuario, id_jogo, estado) VALUES 
            (${id_usuario},
            ${id_jogo},
            not estado)
ON DUPLICATE KEY UPDATE 
    estado = not estado;  `

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

