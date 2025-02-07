drop database db_scorp_games;
create database db_scorp_games;
use db_scorp_games;

create table tbl_usuarios(
id_usuario int primary key not null auto_increment,
 nome varchar(50) not null,
 email varchar(150) not null,
 telefone varchar(15),
 senha varchar(255) not null,
 data_nascimento date not null,
 foto_perfil varchar(200),
 ativo boolean not null
);
create table tbl_classificacao_indicativa(
id_classificacao int primary key not null auto_increment,
foto_classificacao varchar(200),
texto_classificacao int
);
create table tbl_jogos(
id_jogo int primary key not null auto_increment,
nome varchar(100) not null,
descricao text not null,
data_lancamento date not null,
foto_capa varchar(200) not null,
id_classificacao int not null,
foreign key(id_classificacao) references tbl_classificacao_indicativa(id_classificacao) 
);

create table tbl_chats(
id_chat int primary key not null auto_increment,
mensagem text not null,
data_envio date not null,
id_usuario int not null,
id_jogo int not null,
foreign key(id_usuario) references tbl_usuarios(id_usuario),
foreign key(id_jogo) references tbl_jogos(id_jogo) 
);
create table tbl_salvos(
id_salvo int primary key not null auto_increment,
estado boolean not null,
id_usuario int not null,
id_jogo int not null,
foreign key(id_usuario) references tbl_usuarios(id_usuario),
foreign key(id_jogo) references tbl_jogos(id_jogo) 
);

create table tbl_denuncias(
id_denuncia int primary key not null auto_increment,
id_denunciante int not null,
id_tipo int not null,
motivo text not null,
id_usuario int,
foreign key(id_usuario) references tbl_usuarios(id_usuario),
foreign key(id_tipo) references tbl_tipos_denuncia(id_tipo) 
);

create table tbl_tipos_denuncia(
id_tipo int primary key not null auto_increment,
tipo varchar(100) not null
);





ALTER TABLE tbl_salvos
ADD CONSTRAINT unique_usuario_jogo UNIQUE (id_usuario, id_jogo);





insert into tbl_usuarios(nome, email,senha,data_nascimento, ativo) values
('Juvenal Cones', 'cenesju@gmail.com', md5('CLARO278'), '2000-06-30',true),
('Clarice Arnaie', 'clarie@gmail.com', md5('touCerta'), '1978-01-09',true),
('Julia kanasha', 'Juulies@gmail.com', md5('BrruXa56'), '2010-01-09',true),
('Giovana Campos', 'giovanasc@gmail.com', md5('scsp38D9'), '1999-10-29',false),
('Roberto Magalhaes', 'robim@gmail.com', md5('callmeNo'), '1990-04-02',true);

insert into tbl_classificacao_indicativa(foto_classificacao, texto_classificacao) values
('https://img.odcdn.com.br/wp-content/uploads/2022/02/L-AUTO.jpg',0),
('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR12-AUTO.jpg',12),
('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR16-AUTO.jpg',16),
('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR18-AUTO.jpg',18);

insert into tbl_jogos(nome, descricao,data_lancamento,foto_capa,id_classificacao) values
('Minecraft','Minecraft é um jogo em que você constrói coisas com blocos, em um mundo virtual aberto e livre para explorar. É o que os gamers chamam de "sandbox", porque funciona mesmo como uma caixa de areia, em que o único limite para o jogador é a própria imaginação e a prática.', '2009-05-17','mine',1),
('Roblox','Roblox é um sistema de criação de jogos online onde a maior parte do conteúdo é criada por criadores de jogos “amadores” no estúdio Roblox. Esses criadores de jogos são capazes de criar e publicar jogos para a comunidade usando ferramentas simples.','2006-09-01','roblox', 1),
('Pico Park','Pico Park é um jogo cooperativo multijogador independente de ação e quebra-cabeça desenvolvido pelo desenvolvedor japonês TECOPARK. O lançamento inicial do Pico Park para Microsoft Windows foi em 2016 através da varejista de videogames Steam, apresentando jogo multijogador local.', '2019-06-08','picopark', 1),
('God of War','God of War é um jogo eletrônico de ação-aventura desenvolvido pela Santa Monica Studio e publicado pela Sony Interactive Entertainment. Foi lançado em 20 de abril de 2018 para PlayStation 4 e em 14 de janeiro de 2022 para Microsoft Windows.','2018-04-20','gow',4),
('The Sims', 'The Sims é uma série de jogos eletrônicos de simulação de vida real criado pelo designer de jogos Will Wright e produzida pela Maxis. O primeiro jogo da série, The Sims, foi lançado em 4 de fevereiro de 2000. Os jogos da série The Sims são, em grande parte, jogos sandbox, pois não possuem objetivos definidos.','2000-02-04','sims',2);

insert into tbl_salvos(estado, id_usuario,id_jogo) values
(true,5,2),
(true, 5, 3);









#ordena os jogos trazidos a partir do mais favoritado para o menos
SELECT tbl_jogos.*, COUNT(tbl_salvos.id_jogo) AS total_favoritos
FROM tbl_jogos
JOIN tbl_salvos ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
WHERE tbl_salvos.estado = TRUE
GROUP BY tbl_jogos.id_jogo
ORDER BY total_favoritos DESC;

#consulta de jogos favoritos do usuario por nome
SELECT tbl_jogos.*, tbl_salvos.id_salvo 
FROM tbl_jogos
JOIN tbl_salvos ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
JOIN tbl_usuarios ON tbl_salvos.id_usuario = tbl_usuarios.id_usuario
WHERE tbl_salvos.estado = TRUE 
AND tbl_usuarios.nome  LIKE "%Roberto%";

#pesquisa por comunidade
SELECT 
    tbl_jogos.*, 
    CASE 
        WHEN tbl_salvos.id_salvo IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS salvo
FROM tbl_jogos
LEFT JOIN tbl_salvos 
    ON tbl_jogos.id_jogo = tbl_salvos.id_jogo 
    AND tbl_salvos.id_usuario = 5
WHERE tbl_jogos.nome LIKE "%Robl%";

#consulta de jogos favoritos do usuario por id
SELECT tbl_jogos.*, tbl_salvos.id_salvo 
FROM tbl_jogos
JOIN tbl_salvos ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
JOIN tbl_usuarios ON tbl_salvos.id_usuario = tbl_usuarios.id_usuario
WHERE tbl_salvos.estado = TRUE 
AND tbl_usuarios.id_usuario=5;

#pega o chat de um jogo
select tbl_chats.*,tbl_usuarios.nome, tbl_usuarios.id_usuario, tbl_usuarios.foto_perfil from tbl_chats join tbl_usuarios on  
tbl_chats.id_usuario = tbl_usuarios.id_usuario
where tbl_chats.id_jogo=1;

#pega todas as denuncias sobre o software
select * from tbl_denuncias where id_usuario is null;

#pega todas as denuncias recebidas de um usuario
select * from tbl_denuncias where id_usuario=1;

#pega todas as denuncias feitas por um usuario(para controle do adm, ver se ele nn ta fznd de sacanagem)
select * from tbl_denuncias where id_denunciante=1;

#pega os usuarios desativados pelo adm
select * from tbl_usuarios where ativo=false;

#desativa um usuario
update tbl_usuarios set
            ativo =  false
            where tbl_usuarios.id_usuario = 1;
            
#muda o estado salvo de um jogo
update tbl_salvos set
            estado =  false
            where tbl_salvos.id_salvo = 1;

#atualizar um usuario
update tbl_usuarios set
            nome = 'gsgshredd',
            email='rtyugijiknl',
            telefone='',
            data_nascimento= 2000-03-04,
            foto_perfil='',
            ativo =  true
            where tbl_usuarios.id_usuario = 1;
            
/*pega os jogos, organiza do mais favoriitado pro menos e pega se aquele jogo foi ou não favoritado pelo usuario logado*/
SELECT 
    tbl_jogos.*, /*pega todos os jogos*/
    COUNT(tbl_salvos.id_jogo) AS total_favoritos,/*faz o calculo total de em quantas contas aquele jogo está favoritado*/
    CASE 
        WHEN MAX(tbl_usuario_salvou.id_salvo) IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS salvo,/*verifica se nessa "tbl" que foi criada abaixo, possue um id salvo, se estiver null=false*/
MAX(tbl_usuario_salvou.id_salvo) AS id_salvo 
FROM tbl_jogos
-- Contagem dos favoritos de todos os usuários
LEFT JOIN tbl_salvos
    ON tbl_jogos.id_jogo = tbl_salvos.id_jogo
    AND tbl_salvos.estado = TRUE
-- Verifica se o usuário específico salvou o jogo
LEFT JOIN tbl_salvos AS tbl_usuario_salvou
    ON tbl_jogos.id_jogo = tbl_usuario_salvou.id_jogo
    AND tbl_usuario_salvou.id_usuario = 5
    AND tbl_usuario_salvou.estado = TRUE
GROUP BY tbl_jogos.id_jogo
ORDER BY total_favoritos DESC;

#salva um jogo para um usuario se não tiver nenhum item com o mesmo id de usuario e o mesmo id de jogo, e caso tenha, ele atualiza o estado
INSERT INTO tbl_salvos (id_usuario, id_jogo, estado)
VALUES (5, 4, not estado)  
ON DUPLICATE KEY UPDATE 
    estado = not estado; 
