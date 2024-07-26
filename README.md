# Gerenciamento de Projetos

Este é um aplicativo de gerenciamento de projetos desenvolvido em React. Ele permite criar, visualizar, editar e excluir projetos, além de categorizar e gerenciar orçamentos.

## Tecnologias Utilizadas

- React
- React Router
- Axios
- CSS Modules

## Funcionalidades

- Criação de novos projetos
- Visualização de detalhes dos projetos
- Edição de projetos existentes
- Exclusão de projetos
- Classificação dos projetos por categoria
- Gerenciamento de orçamentos

## Instalação

1. Clone o repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

## Uso

1. Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```
1.1 Inicie o servidor backend:

 ```bash
json-server --watch db.json --port 5000 
   ```

2. Abra o navegador e acesse `http://localhost:3000`. 

## Estrutura do Projeto

```plaintext
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├──Form
│   │   │   ├──Input.js
│   │   │   ├──Select.js
│   │   │   ├──SubmitButton.js
│   │   │   ├── ...
│   │   ├──Layout
│   │   │   ├── Container.js
│   │   │   ├── LinkButton.js
│   │   │   └── Message.js
│   │   ├── Pages
│   │   │   ├── Home.js
│   │   │   ├──Project.js
│   │   │   ├── NewProject.js
│   │   │   └── ...
│   │   ├── projects
│   │   │   ├── Projects.js
│   │   │   ├── ProjectsCards.js
│   │   │   ├── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md
