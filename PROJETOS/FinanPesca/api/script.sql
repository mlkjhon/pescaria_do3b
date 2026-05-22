create table usuarios(
id_usuario SERIAL primary key,
nome varchar(100) not null,
email varchar(150) not null,
senha varchar(255) not null,
tipo_acesso varchar(100) not null,
ativo boolean default true
);

create table categorias(
id_categoria SERIAL primary key,
nome varchar(100) not null,
descricao varchar(255) not null,
tipo varchar(100) not null,
cor varchar(20),
icone varchar(155),
ativo boolean default true
);

create table subcategorias(
id_subcategoria SERIAL primary key,
nome varchar(100) not null,
ativo boolean default true,
id_categoria INT,
foreign key (id_categoria) references categorias(id_categoria)
);

CREATE TABLE transacoes(
id_transacao SERIAL PRIMARY KEY,
valor NUMERIC(12,2) NOT NULL,
descricao TEXT,
data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
data_pagamento DATE,
data_vencimento DATE,
tipo CHAR(1),
id_categoria INT,
id_subcategoria INT,
id_usuario INT,
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
FOREIGN KEY (id_subcategoria) REFERENCES subcategorias(id_subcategoria),
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);