# Produtos Favoritos

A aplicação desenvolvida tem como objetivo resolver o cenário descrito como "Produtos Favoritos de nossos Clientes". 

# Stack
- NodeJS         (14.15.4) : https://nodejs.org/en/
- MongoDB        (4.4.5)   : https://www.mongodb.com/
- Express        (4.17.1)  : https://expressjs.com/
- TypeScript     (4.2.4)   : https://www.typescriptlang.org/
- Mocha          (8.3.2)   : https://mochajs.org/
- Sinon          (10.0.0)  : https://sinonjs.org/
- Docker         (20.10.6) : https://www.docker.com/
- Docker Compose (1.27.4)  : https://docs.docker.com/compose/
- Axios          (0.21.1)  : https://www.npmjs.com/package/axios

# Solução

Para esta solução foram desenvolvidos dois microserviços:
- ads-api : responsável pela criação e listagem de produtos;
- users-api : responsável pelo registro e administração de produtos, assim como seus produtos favoritos;

Dado o contexto do desenvolvimento, foi optado por fazer a separação do domínio da forma acima descrita. Sendo um cenário real, seria interessante a análise do contexto de forma mais detalhada, sendo então interessante a criação de um, ou mais, microserviços para a representação do comportamento do usuário no sistema, seja no processo de favoritar produtos, pesquisa, e até, possivelmente, compra.

Visto que a solução fez uso de dois microserviços, se fez necessária a comunicação por uma API, a qual é utilizada para validação do id do produto sendo incluído na lista de favoritos, assim como quando retirado. 

## Projeto
A estrutura de ambos os projetos foram baseadas na Arquitetura Hexagonal (como apresentada https://medium.com/luizalabs/criando-uma-aplica%C3%A7%C3%A3o-modular-muito-al%C3%A9m-do-clean-architecture-5dde3687c5d6?source=collection_category---4------0-----------------------), seguindo a estrutura abaixo:

```
├── src
│   ├── adapters
│   │   ├── input
│   │   │   ├── controllers
│   │   │   ├── middlewares
│   │   │   └── routes
│   │   └── output
│   │       └── database
│   ├── app.ts
│   ├── configs
│   │   └── database
│   ├── core
│   │   └── use-cases
│   │       ├── models
│   ├── exceptions
│   ├── migrations
│   └── utils
├── test
```

## Autenticação e Autorização

Para este controle foram utilizados tokens JWT (com expiração de 50 minutos) , no qual é identificado o uuid do usuário (definido no momento do cadastro de um novo usuário), e o seu nível de acesso, identificado por uma flag true/false. Dessa forma, foram representados os dois possíveis papéis:

- Admin (criado à partir de a migração executada durante o startup do projeto users-api):
  - Pode cadastrar novos produtos;
  - Pode deletar e modificar usuários. Caso o usuário seja deletado, sua lista de produtos favoritos também é deletada;
  - Pode visualizar produtos;
- Usuário:
  - Edição do seu perfil;
  - Deleção do seu próprio perfil. Caso o usuário seja deletado, sua lista de produtos favoritos também é deletada;
  - Adicionar produtos à sua lista de favoritos;
- Mundo: 
  - Visualização listagem de produtos;
  - Visualização de detalhe do produto; 

# Próximos passos
- Evolução de testes unitários;
- Evolução de controle de acessos para utilização de papéis, ao invés de uma flag;
- O fluxo de autenticação poderia ser colocado em um BFF, responsável por validar à quais rotas os usuários deveriam ter acesso, retirando essa necessidade do serviço de domínio;
- Registro de marcas;
- Definição do review score, com melhor definição de seus limites (0-5, 0-10,...). No momento ele aceita somente números positivos, mas não possui um formato definido;
- Criar um banco de dados separado para cada serviço.

# Execução
**assume que docker e docker-compose estejam instalados** 

Para execução, pode-se baixar os arquivos na pasta https://drive.google.com/drive/folders/1htlxW5JH0Il8AWcYKGx2S9431m9NXfrI?usp=sharing, e executar o script chamado run.sh. 
Ou, case deseje-se executar os projetos à partir do código fonte :
1. Copiar o repositório localmente;
2. Acessar o diretório ads-api e executar **npm install**;
3. Acessar o diretório users-api e executar **npm install**;
4. Executar o comando na raiz do diretório onde o repositório foi copiado : sudo docker run -ti -p 27017:27017 --rm mongo --bind_ip 0.0.0.0;
5. Verifique o arquivo .env de ambos os serviços estão com a configuração :  MONGO_HOSTS=0.0.0.0:27017;
7. Executar npm start em ambos os serviços;
8. Deve ser exibida uma mensagem "server is listening on ...", indicando que os serviços estão prontos para começarem a receber requisições.

# Requests

## ads-api
### Criação de Produto
```
POST http://localhost:3000/api/product
Content-Type: application/json
Authorization: Bearer ...

{
  "price": 10, // formato price_cents
  "image": "http://www.google.coim",
  "brand": "Maga",
  "title": "Cadeira Gamer",
  "reviewScore": 10
}
```

## users-api

### Cadastro de usuário
```
POST http://localhost:3001/api/register
Content-Type:application/json

{
  "name": "Fernando",
  "email": "nosfernandos@gmail.com"
}
```
### Login Admin
```
POST http://localhost:3001/api/login
Content-Type:application/json

{
  "name": "admin",
  "email": "admin@admin.com"
}
```

### Login Usuário
```
{
  "name": "Fernando",
  "email": "nosfernandos@gmail.com"
}
```
### Atualização de Usuários
```
PATCH http://localhost:3001/api/user
Content-Type:application/json
Authorization: Bearer ...

{
   "email": "fernando461@gmail.com"
}
```
### Atualização de Usuários (Admin)
```
PATCH http://localhost:3001/api/user/uuid
Content-Type:application/json
Authorization: Bearer <admin>

{
   "email": "fernando461@gmail.com"
}
```
### Deleção de Usuários
```
DELETE http://localhost:3001/api/user
Content-Type:application/json
Authorization: Bearer ...
```
### Deleção de Usuários (Admin)
```
DELETE http://localhost:3001/api/user/<uuid do usupario>
Content-Type:application/json
Authorization: Bearer <admin>
```
### Deleção de Usuários (Admin)
```
DELETE http://localhost:3001/api/user/<uuid do usupario>
Content-Type:application/json
Authorization: Bearer ...
```

### Listagem de Usuários (Admin)
```
GET http://localhost:3001/api/user
Content-Type:application/json
Authorization: Bearer ...
```
