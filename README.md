# Acuttis-calculator-service

<h1 align=center> API DOCUMENTATION </h1>

## Usage

```bash
$ git clone https://github.com/Hoffmann-Ferreira/Acuttis-calculator-service.git

$ cd $nome-repositorio

$ npm install

$ npx prisma generate

$ npm run dev
```

API:

```bash
- AUTH ROTAS 

- POST /login
    - Rota para logar no site
    - headers: {}
    - body: {"email": "teste@teste.com",
             "password": "myPassword2!"}
    
- POST /register
    - Rota para realizar cadastro no site
    - headers: {}
    - body: {"name": "teste",
             "email": "teste@teste.com",
             "password": "myPassword2!"}            
```

```bash
- ACCOUNT ROTA

- GET /find-all-hours/:userId (autenticada)
    - Rota para obter as informações cadastradas pelo usuário
    - headers: {"Authorization": "Bearer ${token}"}
    - body: {}
    
 - POST /calculate-hours (autenticada)
    - Rota para adicionar as informações para o cálculo das horas
    - headers: {"Authorization": "Bearer ${token}"}
    - body: {"collaborator": "teste",
             "initialDate": "2022-10-10T04:45",
             "finalDate": "2022-10-10T10:13",
             "daytimePrice": "5",
             "nightPrice": "10.5"}
```
IMPORTANT:

```bash
- Criar um arquivo .env na raiz do projeto conforme o .env.example

```