# Descrição

API de Reserva de veiculos escrita em TypeScript utilizando o framework NestJS e um banco MongoDB.

## How to run

Para rodar o projeto, primeiro adicione o arquivo .env enviado por email à raiz do projeto e rode o seguinte comando (necessário docker-compose):
```bash
$ docker-compose -f "docker-compose.yml" --env-file .env up -d --build
```

Para ver os logs e se a aplicação está completamente iniciada, use o comando
```bash
docker logs --tail 1000 -f vehicle-booking-api_app_1
```

## Rotas
Documentação Swagger -> [http://localhost:3000/docs](http://localhost:3000/docs)

Health-check -> [http://localhost:3000](http://localhost:3000) [GET]

Usuarios Disponíveis -> [http://localhost:3000/users](http://localhost:3000/users) [GET]

Usuarios Específico -> [http://localhost:3000/users/:id](http://localhost:3000/users/:id) [GET]

Criar Usuário -> [http://localhost:3000/users](http://localhost:3000/users) [POST]

Login -> [http://localhost:3000/auth/login](http://localhost:3000/auth/login) [POST]

## Rotas Protegidas

Após o Login, adicione o access_token recebido ao header das requisições(Bearer token)

Listar veículos -> [http://localhost:3000/vehicles](http://localhost:3000/vehicles) [GET]

Reservar veículo -> [http://localhost:3000/vehicles/reserve/:id](http://localhost:3000/vehicles/reserve/:id) [PATCH]

Retornar veículo -> [http://localhost:3000/vehicles/return/:id](http://localhost:3000/vehicles/return/:id) [PATCH]

Um usuário logado só pode ter um único veículo alugado e só pode devolver o próprio veículo.

Para saber qual veículo está e posse de certo usuário, veja o id no campo vehicle na lista de usuários ou no get users/:id
