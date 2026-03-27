create table usuarios(
id_usuarios SERIAL primary key,
nome varchar(100) not null,
email varchar(150) not null,
senha varchar (255) not null,
tipo_acesso varchar (100) not null,
ativo boolean default false
);

create table categorias(
id_categorias SERIAL primary key,
nome varchar(100) not null,
descricao varchar(255)not null,
cor varchar(20)not null,
icone varchar(155)not null,
ativo boolean default false
);

create table subcategorias(
id_subcategoria serial prymary key,
nome varchar(100) not null,
ativo boolean default false,
id_categoria int,
foreign (id_categoria) references categorias(id_categorias)
);

create table transacoes(
id_transacao SERIAL primary key,
valor numeric(12,2) not null,
descricao text,
data_registro timestamp default current_timestamp,
data_pagamento date,
data_vencimento date,
tipo char(1),
id_categoria int,
id_subcategoria int,
foreign key (id_categoria) references categorias(id_categorias),
foreign key (id_subcategoria) references subcategorias(id_subcategoria)
);