SELECT COUNT(medicamento) FROM farmacia;

SELECT MIN(idade) FROM usuarios;

SELECT MAX(idade) FROM usuarios;

SELECT ROUND(AVG(idade)) AS "idade media" FROM usuarios WHERE idade >= 18;

SELECT SUM(estoque) AS estoque FROM farmacia WHERE categoria = 'blue' OR categoria = 'black';

SELECT categoria, SUM(estoque) AS estoque FROM farmacia WHERE categoria IS NOT NULL GROUP BY categoria;

SELECT SUM(estoque) AS estoque FROM farmacia WHERE categoria IS NULL;

SELECT COUNT(medicamento) FROM farmacia WHERE categoria IS NULL;

SELECT CONCAT(medicamento, ' (', categoria, ')') FROM farmacia WHERE categoria IS NOT NULL;

SELECT CONCAT(id, ' - ', medicamento, ' (', COALESCE(categoria, 'sem categoria'), ')') FROM farmacia;

SELECT nome, idade, CAST(cadastro AS date) AS cadastro FROM usuarios WHERE CAST (cadastro AS date) BETWEEN CAST('2020-01-01' AS date) AND CAST('2020-12-31' AS date); 

SELECT nome, idade, email, AGE(CAST(cadastro AS timestamp)) AS tempo FROM usuarios WHERE IDADE < 18; 

SELECT nome, idade, email, AGE(CAST(cadastro AS date)) AS tempo FROM usuarios WHERE IDADE >= 60; 

SELECT categoria, COUNT(categoria) AS quantidade FROM farmacia WHERE categoria IS NOT NULL GROUP BY categoria;

SELECT idade, COUNT(idade) AS quantidade FROM usuarios WHERE idade >= 18 GROUP BY idade;

SELECT categoria, COUNT(categoria) AS quantidade, SUM(estoque) AS estoque FROM farmacia GROUP BY categoria LIMIT 3;
