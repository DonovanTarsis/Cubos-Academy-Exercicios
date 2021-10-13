DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_loja TEXT NOT NULL,
  email VARCHAR(80) NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

DROP TABLE IF EXISTS produtos CASCADE;

CREATE TABLE produtos(
	id SERIAL PRIMARY KEY,
  usuario_id integer NOT NULL REFERENCES usuarios(id),
  nome TEXT NOT NULL,
  quantidade integer NOT NULL,
  categoria TEXT,
  preco bigint NOT NULL,
  descricao TEXT NOT NULL,
  imagem TEXT
);
