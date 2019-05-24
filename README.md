# mackprog
Repositório para o projeto da disciplina de Programação de Sistemas II

## Códigos para criação das tabelas do banco de dados:

### Tabela Time
CREATE TABLE time (
id BIGINT NOT NULL
GENERATED ALWAYS AS IDENTITY(START WITH 1, INCREMENT BY 1),
nome VARCHAR(60) NOT NULL,
ano_fundacao VARCHAR(11) NOT NULL,
cidade VARCHAR(80) NOT NULL,
estado VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

### Tabela Jogo
CREATE TABLE jogo (
id BIGINT NOT NULL
GENERATED ALWAYS AS IDENTITY(START WITH 1, INCREMENT BY 1),
nome_time_a VARCHAR(60) NOT NULL,
nome_time_b VARCHAR(60) NOT NULL,
gols_time_a INT NOT NULL,
gols_time_b INT NOT NULL,
PRIMARY KEY (id)
);

### Tabela Conta Bancaria
CREATE TABLE conta_bancaria (
id BIGINT NOT NULL
GENERATED ALWAYS AS IDENTITY(START WITH 1, INCREMENT BY 1),
nome_titular VARCHAR(60) NOT NULL,
saldo DOUBLE NOT NULL,
numero_agencia VARCHAR(60) NOT NULL,
PRIMARY KEY (id)
);
