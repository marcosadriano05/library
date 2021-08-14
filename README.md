<br />
<p align="center">
    <img src="https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png" alt="Logo" width="200">

  <h3 align="center">Biblioteca by <a href="https://github.com/Lorenalgm">Lorena</a></h3>
 <br />
  <p align="center">
     Sistema de gerenciamento de biblioteca
       <br />
    <br />
    <a href="https://github.com/devchallenge-io/biblioteca-backend">Desafio</a>
    ·
    <a href="https://www.devchallenge.com.br/">DevChallenge</a>
  </p>
</p>

# Devchallenge
<a href="https://devchallenge.now.sh/"> DevChallenge</a> permite que você evolua suas skills como programador! Participe da nossa <a href="https://discord.gg/yvYXhGj">comunidade</a> o/

## Desafio
Seu desafio é criar o backend para um sistema de gerenciamento de uma biblioteca!

## Requisitos:
### Rotas da aplicação:
<b>[POST] </b> /obras :  A rota deverá receber titulo, editora, foto, e autores dentro do corpo da requisição. Ao cadastrar um novo projeto, ele deverá ser armazenado dentro de um objeto no seguinte formato: { id: 1, titulo: 'Harry Potter', editora: 'Rocco',foto: 'https://i.imgur.com/UH3IPXw.jpg', autores: ["JK Rowling", "..."]};<br><br>
<b>[GET] </b> /obras/ : A rota deverá listar todas as obras cadastradas<br><br>
<b>[PUT] </b> /obras/:id: : A rota deverá atualizar as informações de titulo, editora, foto e autores da obra com o id presente nos parâmetros da rota<br><br>
<b>[DELETE] </b> /obras/:id: : A rota deverá deletar a obra com o id presente nos parâmetros da rota<br>

## Como iniciar

É necessário ter o Node.js instalado na sua máquina.

Clone o projeto com o comando:

```shell
https://github.com/marcosadriano05/library.git
```

No diretório com o programa rode o comando a seguir para instalar todas as dependências necessárias:

```shell
npm install
```

ou

```shell
yarn
```

Em seguida é preciso executar todas as migrations para que o banco de dados seja criado/atualizado:

```shell
npm run run:migrations
```

ou

```shell
yarn run:migrations
```

Após isso, execute o comando para que a aplicação funcione em ambiente de desenvolvimento:

```shell
npm run dev
```

ou

```shell
yarn dev
```

Para a aplicação executar no ambiente de produção, é necessário criar a build do projeto:

```shell
npm run build
```

ou

```shell
yarn build
```

Após isso, é necessário atribuir o seguinte valor para a variável de ambiente:

```shell
NODE_ENV=production
```

E depois executar o comando de start:

```shell
npm run start
```

ou

```shell
yarn start
```

## License

MIT.

## Author
<table>
  <tr>
  <td align="center"><img src="https://github.com/marcosadriano05.png" width="100px;" alt="Marcos Adriano"/><br /><sub><b><a href="https://linkedin.com/in/marcosadriano05" title="Marcos">Marcos Adriano</a></b></sub><br/>Web Developer</td>
  </tr>
</table>

### Contacts

[![Linkedin Badge](https://img.shields.io/badge/-Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/marcosadriano05/)](https://www.linkedin.com/in/marcosadriano05/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:marcosadriano740@gmail.com)](mailto:marcosadriano740@gmail.com)