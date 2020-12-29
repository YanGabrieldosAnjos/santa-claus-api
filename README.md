# santa-claus-api 
- Esse projeto consiste numa api para cartinhas do papai noel

# Pré-requisitos
-  npm 6.12.x
-  node 12.3.x

# Instalação
Instalar node e npm
# Como rodar
criar um arquivo .env e preencher como mostrado em env.example

docker-compose up --build

# Testes

npm test
# Endpoints

em todas as requisições, menos login, e criação de usuário é necessário passar o token no header: (auth: "token"), que é retornado no login
## usuário: 

POST /api/usuario/inserir => request: {name: string, username: string, password: string}, response: {name}
POST /api/usuario/login => request: {username: string, password: string}, response: { auth: true, token, userId }

## Carta: 

POST /api/carta request: {name: string, username: string, password: string}, response: {name}
GET /api/carta/cartas request: {name: string}, response: letters (array)
PUT /api/carta request: {_id: string, signature: string, letter: string, name: string}, response: {letter}
DELETE /api/carta request: {_id: string, signature: string, letter: string, name: string}, response: {"deleted"}