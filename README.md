# API-TO-DO-LIST
- Projeto de API to-do-list, sendo possivel registrar `TASKS` referente a cada usuario especifico, existem dois tipos de usuarios com a `ROLE = 1 OU ROLE = 0`, sendo igual a 1 os administradores e igual 0 usuarios comuns. Só é Possivel criar, editar, deletar e acessar as tasks quem é ADMIN. 
## Back-End
- Framework Express
- ORM sequelize - Utilizado para conexao e comunicação ao banco de dados.
- Postgres - Como banco de dados relacional.
- Arquitetura MVC
- Hash para cadastrar senhas.
- autenticação JWT.
## Dev-Dependencies
- Nodemon - Utilizado para manter o servidor rodando mesmo após modificação no código.
## ☕ EndPoints
## POST /user
- Rota para criação de usuario
### Parametros
```
const { email, password } = req.body
```
### Respostas
- Caso já exista um email cadastrado e seja o mesmo que o usuario está tentando cadastrar.
#### STATUS CODE 406
### Exemplo de resposta:
```
err: 'Usuario já cadastrado com esse email'
```
- Caso o usuario seja cadastrado com sucesso. 
#### STATUS CODE 201 
### Exemplo de resposta:
```
msg: 'Usuario criado com sucesso'
```
## POST /login
- Rota para efetuar o login do usuario.
### Parametros 
```
const {email, password} = req.body
```
### Respostas
- Caso o email fornecido pelo usuario não esteja cadastrado no banco de dados 
#### STATUS CODE 404
### Exemplo de resposta:
```
err: "Usuario não cadastrado"
```
- Caso a senha fornecida pelo usuario esteja incorreta. 
#### STATUS CODE 406
### Exemplo de resposta:
```
err: "Senha Incorreta"
```
- Caso o usuario seja logado com sucesso, irá retornar um token JWT, será necessario para conseguir acesso a outras rotas. 
#### STATUS CODE 200
### Exemplo de resposta:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlZ2FzdXNicjEwMDBAZ21haWwuY29tIiwicm9sZSI6MSwiaWF0IjoxNjc1Mjg2MDIwLCJleHAiOjE2NzUzNzI0MjB9.QE9LGu8hJ4sP_Z9OYX1zXl4h5ADF_xwVavlrxt4bbDI"
```
## Middleware
- Esse middleware é para autenticação do token. Todas as rotas abaixo estão usando esse middleware, ou seja, as respostas poderá ser a mesma caso o token não seja passado ou o token passado não esteja certo.
### Parametros 
- Passar o token de login em forma de Bearer Token. 
### Respostas 
- Caso não seja passado o token.
#### STATUS CODE 403
### Exemplo de respotas:
```
msg: "Você não está autorizado!"
```
- Caso o token seja invalido.
#### STATUS CODE 403
### Exemplo de resposta:
```
msg: "Você não está autorizado!!"
```
- Caso o usuario não tenha a `ROLE = 1 - (Role cadastrada no BD)`, ou seja, não é admin. 
#### STATUS CODE 403
### Exemplo de respostas 
```
msg: "Você não tem permissão para acessar essa rota!"
```
## POST /task
- Rota para criação de tasks, no BANCO DE DADOS o `STATUS` da task sempre será definido inicialemnte como `Pendente`. Nessa rota é necessario passar um o `ID` do usuario que irá receber a task, a tabelas task e user no banco de dados tem relacionamento de um para muitos.
### Parametro
```
const { task, id } = req.body
```
### Respostas
- Caso o parametro task não seja passado, ou seja passado mas sem nada escrito.
#### STATUS CODE 406
### Exemplo de respota: 
```
err: "Task Invalida"
```
- Caso o `ID` passado seja invalido, ou então não seja correspondente a nenhum usuario cadastrado.
#### STATUS CODE 404
```
err: 'Usuario não encontrado'
```
- Caso a task seja aceita e for cadastrada no banco de dados. 
#### STATUS CODE 201
### Exemplo de respota: 
```
{
    "id": 20,
    "task": "Testando Foreignkey",
    "userId": 3,
    "updatedAt": "2023-02-01T21:56:14.086Z",
    "createdAt": "2023-02-01T21:56:14.086Z",
    "status": "Pendente"
}
```
## GET /task/user/:id
- O objetivo dessa rota é retornar a task referente a cada usuario. 
### Parametro
```
const id = req.params.id
```
### Respostas
- Caso o `ID` do usuario passado como parametro, não corresponda a nenhum usuario no banco de dados. 
#### STATUS CODE 404
### Exemplo de respota:
```
err: "Usuario não cadastrado"

```
-  Caso exista task cadastradas para aquele usuario.
#### STATUS CODE 200
### Exemplo de respota:
```
[
  {
    "id": 18,
    "task": "Acho que funcionou",
    "status": "Pendente",
    "userId": 4,
    "User": {
                "id": 4,
                "email": "pegasusbr1000@gmail.com",
                "role": 1
            }
    },
  {
    "id": 17,
    "task": "Término Portifolio",
    "status": "Concluido",
    "userId": 4,
    "User": {
                "id": 4,
                "email": "pegasusbr1000@gmail.com",
                "role": 1
            }
   }
]

```
## PUT /task/:id
- Essa rota é utilizada para editar uma task. 
### Parametro
```
 const id = req.params.id

 const { task }= req.body
```
### Respostas
- Caso o `ID` da task passado como parametro, não corresponda a nenhuma task cadastrada no banco de dados. 
#### STATUS CODE 404
### Exemplo de respota:
```
err: "Task não encontrada"
```
- Caso o campo `TASK` passado no corpo da requisição, seja nulo ou esteja sem informação.
#### STATUS CODE 406
### Exemplo de respota:
```
err: "Task Invalida"
```
- Caso a atualização seja feita com sucesso.
#### STATUS CODE 200
### Exemplo de respota:
```
msg: "Task alterada com sucesso"
```
## DELTE /task/:id
- Rota utilizada para deletar um task.
### Parametro
```
 const id = req.params.id
```
### Respostas
- Caso o `ID` da task passado como parametro, não corresponda a nenhuma task cadastrada no banco de dados. 
#### STATUS CODE 404
### Exemplo de respota:
```
err: "Task não encontrada"
```
- Caso a deleção da task seja concluida com sucesso.
#### STATUS CODE 200
### Exemplo de respota:
```
msg: 'Task Excluida'
```
## PUT /task/status/:id
- Rota feita somente para alterar o `STATUS` da task, todas por padrão são criadas como `Pendente`, ao chamar essa rota modifica o `STATUS` para `CONCLUIDO`.
### Parametro
```
const id = req.params.id
```
### Respostas
- Caso o `ID` da task passado como parametro, não corresponda a nenhuma task cadastrada no banco de dados. 
#### STATUS CODE 404
### Exemplo de respota:
```
err: "Task não encontrada"
```
- Caso a `TASK` que esteja sendo alterada jà està com o `STATUS` de `CONCLUIDO`, irá retornar as seguintes mensagens:
#### STATUS CODE 406
### Exemplo de respota:
```
err: 'Essa tarefa já está com o status de concluida'
```
- Caso o `STATUS` seja alterado com sucesso. 
#### STATUS CODE 200
### Exemplo de respota:
```
msg: 'Status alterado'
```
# 💻 Pré-requisitos
- Possuir algum banco de dados SQL no seu computador, seja ele postgres, mysql ou qualquer outro. 
# 🚀 Instalação do Projeto
 - Rodar o seguinte comando dentro do cmd ou powershell:
 ```
 npm install
 ```
 - Alterar a configuração do banco de dados dentro do arquivo `DATABASE.JS`(Localizado dentro da pasta `SRC`, dentro da pasta `CONFIG`)
 - Rodar o seguinte comando para rodar as `MIGRATIONS`, desta forma já irá estruturar seu BANCO DE DADOS da forma que está igual ao do projeto. 
 ```
 npx sequelize db:migrate 
 ```
