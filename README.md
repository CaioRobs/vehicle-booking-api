# Descrição

API de Reserva de veiculos escrita em TypeScript, utilizando NestJS e MongoDB

## How to run

Para rodar o projeto, primeiro adicione o arquivo .env enviado por email à raiz do projeto e rodar o seguinte comando(necessário docker-compose):
```bash
$ docker-compose -f "docker-compose.yml" --env-file .env up -d --build
```
## Rotas
Health-check -> [http://localhost:3000](http://localhost:3000)
Usuarios Disponíveis -> [http://localhost:3000/users](http://localhost:3000/users)
Login -> [http://localhost:3000/auth/login](http://localhost:3000/auth/login)(post)

Após o Login, adicione o token recebido ao header das requisições(Bearer token)
Rotas Protegidas

Listar veículos -> [http://localhost:3000/vehicles](http://localhost:3000/vehicles)
Reservar veículo -> [http://localhost:3000/vehicles/reserve/:id](http://localhost:3000/vehicles/reserve/:id)
Retornar veículo -> [http://localhost:3000/vehicles/return/:id](http://localhost:3000/vehicles/return/:id)
