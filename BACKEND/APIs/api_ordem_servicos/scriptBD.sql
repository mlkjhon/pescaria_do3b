create table USUARIOS(
  id_usuario SERIAL primary key,
  nome varchar(100) not null,
  email varchar(150) not null,
  senha varchar(255) not null
);

create table DEPARTAMENTOS(
  id_departamento SERIAL primary key,
  nome varchar(100) not null,
  descricao varchar(255) 
);

create table ORDEM_SERVICOS(
  id_ordem SERIAL primary key,
  numero_ordem int unique,
  titulo varchar(100) not null,
  descricao varchar(255) not null,
  prioridade varchar(100) not null,
  status varchar(100) not null,
  data DATE not null,
  id_usuario integer not null references USUARIOS(id_usuario), 
  id_departamento integer not null references DEPARTAMENTOS(id_departamento) 
);

-- ADICIONANDO USÁRIOS
insert into USUARIOS(nome, email, senha) VALUES('Ana SIlva', 'ana.silva@email.com', 'senha123');
insert into USUARIOS(nome, email, senha) VALUES('Gustavo Henrique', 'gustavo.henrique@email.com', 'senha009');

-- ADICIONANDO DEPARTAMENTOS
insert into DEPARTAMENTOS(nome, descricao) VALUES('TI', 'Tecnologia da Informação'), ('Manutenção', 'Setor de manutenção geral');

-- ADICIONANDO ORDEM DE SERVIÇO
INSERT INTO ORDEM_SERVICOS (numero_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento)
  VALUES(1001, 'Trocar cabo de rede', 'Ponto de rede da sala 203 está sem conexão', 'media', 'aberta', '2026-02-26', 1, 1),
  ('1002', 'Consertar ar-condicionado', 'Unidade do laboratório parou de gelar', 'alta', 'em_andamento', '2026-02-26', 2, 2);


create table TESTE(
  id_usuario SERIAL primary key,
  nome varchar(100) not null,
  email varchar(150) not null,
  senha varchar(255) not null
);