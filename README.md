<h1 align="center">
  <a href="https://facialrecognition-front.herokuapp.com/">🔗 Facial Recognition</a>
 </h1>

Controle de acesso via login, podendo realizar também seu cadastro para uso. Classificando por usuário, controla quantas vezes foi realizado o reconhecimento facial das imagens.

Projeto back-end independente para login, cadastro, perfil e atualização de imagem, comentado acima. Com uso de bando de dados relacional postgree.

### Tabelas criadas

```
CREATE TABLE login (
	id serial PRIMARY KEY,
	hash varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
);

CREATE TABLE users (
	id serial PRIMARY KEY,
	name VARCHAR(100),
	email text UNIQUE NOT NULL,
	entries BIGINT DEFAULT 0,
	joined TIMESTAMP NOT NULL
);
```

### Rodando aplicação

```bash
# Abra o terminal e copie este repositório com o comando

git clone https://github.com/dijair12/facialrecognition-api.git
# ou use a opção de download.

# Entre na pasta com 
cd facialrecognition-api

# Instale as dependências
yarn install

# Rode o aplicação
yarn start

# Acesse http://localhost:3001 no seu navegador.
```
