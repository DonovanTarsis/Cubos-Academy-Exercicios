DROP TABLE IF EXISTS categorias CASCADE;

CREATE TABLE categorias(
	id serial primary key,
  nome varchar(50) NOT NULL
);




DROP TABLE IF EXISTS produtos CASCADE;

CREATE TABLE produtos(
	id serial primary key,
  nome varchar(100),
  descricao text,
  preco bigint,
  quantidade_em_estoque integer,
  categoria_id integer NOT NULL references categorias(id)
);


DROP TABLE IF EXISTS clientes CASCADE;

CREATE TABLE clientes(
	cpf char(11) NOT NULL primary key UNIQUE,
  nome varchar(150) NOT NULL
);


DROP TABLE IF EXISTS vendedores CASCADE;

CREATE TABLE vendedores(
	cpf char(11) NOT NULL primary key UNIQUE,
  nome varchar(150) NOT NULL
);

DROP TABLE IF EXISTS pedidos CASCADE;

CREATE TABLE pedidos(
	id serial primary key,
  valor bigint,
  cliente_cpf char(11) NOT NULL references clientes(cpf),
  vendedor_cpf char(11) NOT NULL references vendedores(cpf)
);

DROP TABLE IF EXISTS itens_do_pedido CASCADE;

CREATE TABLE itens_do_pedido(
	id serial primary key,
  pedido_id integer NOT NULL references pedidos(id),
  quantidade integer NOT NULL,
  produto_id integer NOT NULL references produtos(id)
);

INSERT INTO categorias (nome)
VALUES
('frutas'), --1
('verduras'), --2
('massas'), --3
('bebidas'), --4
('utilidades'); --5

INSERT INTO produtos
(nome, descricao, preco, quantidade_em_estoque, categoria_id)
VALUES
('Mamão', 'Rico em vitamina A, potássio e vitamina C', 300, 123, 1),
('Maçã', 'Fonte de potássio e fibras.', 90, 34, 1),
('Cebola', 'Rico em quercetina, antocianinas, vitaminas do complexo B, C.', 50, 76, 2),
('Abacate', 'NÃO CONTÉM GLÚTEN.', 150, 64, 1),
('Tomate', 'Rico em vitaminas A, B e C.', 125, 88, 1),
('Acelga', 'NÃO CONTÉM GLÚTEN.', 235, 13, 2),
('Macarrão parafuso', 'Sêmola de trigo enriquecida com ferro e ácido fólico, ovos e corantes naturais', 690, 5, 3),
('Massa para lasanha', 'Uma reunião de família precisa ter comida boa e muita alegria.', 875, 19, 3),
('Refrigerante coca cola lata', 'Sabor original', 350, 189, 4),
('Refrigerante Pepsi 2l', 'NÃO CONTÉM GLÚTEN. NÃO ALCOÓLICO.', 700, 12, 4),
('Cerveja Heineken 600ml', 'Heineken é uma cerveja lager Puro Malte, refrescante e de cor amarelo-dourado', 1200, 500, 4),
('Agua mineral sem gás', 'Smartwater é água adicionado de sais mineirais (cálcio, potássio e magnésio) livre de sódio e com pH neutro.', 130, 478, 4),
('Vassoura', 'Pigmento, matéria sintética e metal.', 2350, 30, 5),
('Saco para lixo', 'Reforçado para garantir mais segurança', 1340, 90, 5),
('Escova dental', 'Faça uma limpeza profunda com a tecnologia inovadora', 1000, 44, 5),
('Balde para lixo 50l', 'Possui tampa e fabricado com material reciclado', 2290, 55, 5),
('Manga', 'Rico em Vitamina A, potássio e vitamina C', 198, 176, 1),
('Uva', 'NÃO CONTÉM GLÚTEN.', 420, 90, 1);


INSERT INTO clientes VALUES 
('80371350042', 'José Augusto Silva'),
('67642869061', 'Antonio Oliveira'),
('63193310034', 'Ana Rodrigues'),
('75670505018', 'Maria da Conceição');

INSERT INTO vendedores VALUES 
('82539841031', 'Rodrigo Sampaio'),
('23262546003', 'Beatriz Souza Santos'),
('28007155023', 'Carlos Eduardo');

INSERT INTO pedidos (cliente_cpf, vendedor_cpf) VALUES
('80371350042', '28007155023');


INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id) VALUES
(1, 1, 1),
(1, 1, 10),
(1, 6, 11),
(1, 1, 15),
(1, 5, 2);

UPDATE pedidos 
SET valor = (SELECT (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE pedidos.id = 1
GROUP BY pedidos.id)
WHERE id = 1;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 1 AND produtos.id = 1)
WHERE id = 1;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 1 AND produtos.id = 10)
WHERE id = 10;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 1 AND produtos.id = 11)
WHERE id = 11;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 1 AND produtos.id = 15)
WHERE id = 15;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 1 AND produtos.id = 2)
WHERE id = 2;

INSERT INTO pedidos (cliente_cpf, vendedor_cpf) VALUES
('63193310034', '23262546003');

INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id) VALUES
(2, 10, 17),
(2, 3, 18),
(2, 5, 1),
(2, 10, 5),
(2, 2, 6);

UPDATE pedidos 
SET valor = (SELECT (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE pedidos.id = 2
GROUP BY pedidos.id)
WHERE id = 2;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 2 AND produtos.id = 17)
WHERE id = 17;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 2 AND produtos.id = 18)
WHERE id = 18;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 2 AND produtos.id = 1)
WHERE id = 1;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 2 AND produtos.id = 5)
WHERE id = 5;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 2 AND produtos.id = 6)
WHERE id = 6;

INSERT INTO pedidos (cliente_cpf, vendedor_cpf) VALUES
('75670505018', '23262546003');

INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id) VALUES
(3, 1, 13),
(3, 6, 12),
(3, 5, 17);

UPDATE pedidos 
SET valor = (SELECT (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE pedidos.id = 3
GROUP BY pedidos.id)
WHERE id = 3;


UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 3 AND produtos.id = 13)
WHERE id = 13;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 3 AND produtos.id = 12)
WHERE id = 12;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 3 AND produtos.id = 17)
WHERE id = 17;


INSERT INTO pedidos (cliente_cpf, vendedor_cpf) VALUES
('75670505018', '82539841031');

INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id) VALUES
(4, 1, 16),
(4, 6, 18),
(4, 1, 7),
(4, 3, 1),
(4, 20, 5),
(4, 2, 6);

UPDATE pedidos 
SET valor = (SELECT (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE pedidos.id = 4
GROUP BY pedidos.id)
WHERE id = 4;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 4 AND produtos.id = 16)
WHERE id = 16;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 4 AND produtos.id = 18)
WHERE id = 18;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 4 AND produtos.id = 7)
WHERE id = 7;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 4 AND produtos.id = 1)
WHERE id = 1;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 4 AND produtos.id = 5)
WHERE id = 5;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 4 AND produtos.id = 6)
WHERE id = 6;



INSERT INTO pedidos (cliente_cpf, vendedor_cpf) VALUES
('67642869061', '82539841031');

INSERT INTO itens_do_pedido (pedido_id, quantidade, produto_id) VALUES
(5, 8, 18),
(5, 1, 8),
(5, 3, 17),
(5, 8, 5),
(5, 2, 11);

UPDATE pedidos 
SET valor = (SELECT (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE pedidos.id = 5
GROUP BY pedidos.id)
WHERE id = 5;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 5 AND produtos.id = 18)
WHERE id = 18;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 5 AND produtos.id = 8)
WHERE id = 8;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 5 AND produtos.id = 17)
WHERE id = 17;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 5 AND produtos.id = 5)
WHERE id = 5;

UPDATE produtos
SET quantidade_em_estoque = (SELECT (produtos.quantidade_em_estoque - itens_do_pedido.quantidade) AS valor FROM itens_do_pedido
JOIN produtos ON produtos.id = itens_do_pedido.produto_id
WHERE itens_do_pedido.pedido_id = 5 AND produtos.id = 11)
WHERE id = 11;



--SELECT pedidos.id, itens_do_pedido.quantidade, produtos.nome, produtos.preco FROM pedidos 
--JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
--JOIN produtos ON produtos.id = itens_do_pedido.produto_id;



--SELECT pedidos.id, itens_do_pedido.quantidade, produtos.nome, produtos.preco, (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
--JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
--JOIN produtos ON produtos.id = itens_do_pedido.produto_id
--GROUP BY pedidos.id, itens_do_pedido.quantidade, produtos.nome, produtos.preco;


--SELECT pedidos.id, (sum(itens_do_pedido.quantidade * produtos.preco)) AS valor FROM pedidos 
--JOIN itens_do_pedido ON pedidos.id = itens_do_pedido.pedido_id
--JOIN produtos ON produtos.id = itens_do_pedido.produto_id
--GROUP BY pedidos.id;

--SELECT produtos.id, produtos.quantidade_em_estoque, (sum(itens_do_pedido.quantidade)) AS soma FROM itens_do_pedido
--JOIN produtos ON produtos.id = itens_do_pedido.produto_id
--GROUP BY produtos.id, produtos.quantidade_em_estoque;


SELECT produtos.id, produtos.nome, categorias.nome FROM produtos
LEFT JOIN categorias ON produtos.categoria_id = categorias.id
ORDER BY produtos.id ASC;


SELECT pedidos.id AS id_do_pedido, valor, clientes.nome, vendedores.nome FROM pedidos
JOIN clientes ON pedidos.cliente_cpf = clientes.cpf
JOIN vendedores ON pedidos.vendedor_cpf = vendedores.cpf
ORDER BY pedidos.id;

SELECT categorias.nome, (sum(produtos.quantidade_em_estoque)) FROM produtos
LEFT JOIN categorias ON produtos.categoria_id = categorias.id
GROUP BY categorias.id
ORDER BY categorias.id ASC;


SELECT produtos.id, produtos.nome, (sum(itens_do_pedido.quantidade)) AS quantidade_vendida FROM produtos
LEFT JOIN itens_do_pedido ON produtos.id = itens_do_pedido.produto_id
GROUP BY produtos.id, produtos.quantidade_em_estoque;










