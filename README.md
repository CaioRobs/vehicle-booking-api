# Descrição

API de Reserva de veiculos escrita em TypeScript, utilizando NestJS e MongoDB

## How to run

Para rodar o projeto, primeiro adicione o arquivo .env enviado por email à raiz do projeto e rodar o seguinte comando(necessário docker-compose):
```bash
$ docker-compose -f "docker-compose.yml" --env-file .env up -d --build
```

Use o comando 
```bash
docker logs --tail 1000 -f vehicle-booking-api_app_1
```
para ver os logs e se a aplicação terminou de iniciar.
## Rotas
Health-check -> [http://localhost:3000](http://localhost:3000) [GET]

Usuarios Disponíveis -> [http://localhost:3000/users](http://localhost:3000/users) [GET]

Login -> [http://localhost:3000/auth/login](http://localhost:3000/auth/login) [POST]

##Rotas Protegidas
Após o Login, adicione o access_token recebido ao header das requisições(Bearer token)

Listar veículos -> [http://localhost:3000/vehicles](http://localhost:3000/vehicles) [GET]

Reservar veículo -> [http://localhost:3000/vehicles/reserve/:id](http://localhost:3000/vehicles/reserve/:id) [PATCH]

Retornar veículo -> [http://localhost:3000/vehicles/return/:id](http://localhost:3000/vehicles/return/:id) [PATCH]
