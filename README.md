# Desafio backend Mobix

API para consulta de principais personagens das Cronicas de Gelo e Fogo.

## Docker

Esta API está em um container Docker, utilize `docker-compose up --build` para inicia-la.

Se preferir nao utilizar o docker, instale os pacotes com `npm install` e depois execute `npm start`

## Coleta de Dados

- Os dados utilizados nesta api foram coletados de [An API of Ice And Fire](https://anapioficeandfire.com/)
- Foram considerados apenas os personagens pricipais dos cinco livros das Cronicas de Gelo e fogo.
- Todas as capas dos 12 livros do universo das Cronicas foram coletadas.

As credenciais para o MongoDB devem ser inseridas em um arquivo .env (ver exemplo em .env-example).
Para fazer a coleta de dados, execute o comando:  
`npm run scrape`

## Rotas

As rotas presentes na API sao as seguintes:

### /char/povCharacters

> Retorna um array com a informacao completa sobre todos os personagens principais.  
> Metodo: GET

### /char?id=148

> Retorna um array com os detalhes sobre o/a(s) personagens indicados na query por `?id=X&id=Y`. (O id das personagens foi mantido o mesmo que na API de onde os dados foram extraidos)  
> Metodo: GET

### /books/cover?id=1

> Retorna a(s) capa(s) do(s) livro(s) indicados na query por `?id=X&id=Y`. (O id dos livros foi mantido o mesmo que na API de onde os dados foram extraidos)  
> Metodo: GET

### /char/books/148

> Retorna todos os livros relacionados a personagem indicada.  
> Metodo: GET
