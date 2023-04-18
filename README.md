<div style="display:flex;justify-content:center;align-items:center;">
  <img src="https://i.imgur.com/rgPZQwF.png" title="Logo" alt="Git" width="500" height="350"/>
</div>

# Taskifty

Taskify é um aplicativo de gerenciamento de tarefas que ajuda a organizar atividades diárias de forma simples e eficiente. Com ele, é possível criar, priorizar e acompanhar o status das tarefas, definir prazos, receber notificações e muito mais. Com uma interface intuitiva e recursos poderosos, o Taskify é a ferramenta ideal para aumentar a produtividade e manter o foco nas atividades mais importantes.

# Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB

# Funcionalidades

- Crie e edite tarefas;
- Defina prioridades para as tarefas;
- Defina prazos para as tarefas;
- Acompanhe o status das tarefas em uma visualização de lista;
- Adicionar colaboradores para compartilhar tarefas;

# Funcionalidadaes futuras

- Criar visualizações diferentes para as tarefas (por exemplo, visualização de calendário);
- Adicionar notas e anexos para as tarefas;
- Adicionar integração com outras ferramentas, como o Google Agenda.
- Receba notificações sobre prazos e status das tarefas;

## Instalando com o docker
- Clone o repositório para a sua máquina
- Defina suas variáveis de ambiente no arquivo .env:

```
    DATABASE_URL=mongodb://127.0.0.1:27017/DATABASENAME
    JWT_SECRET=mysecret
    JWT_EXPIRATION_TIME=60m
    REFRESH_TOKEN_SECRET=myrefreshsecret
    REFRESH_TOKEN_EXPIRATION_TIME=1d
```

- Execute o comando abaixo para construir o container da API:
```
docker compose --build
```
- Inicie o container com o comando:
```
docker compose up
```
- Abra o navegador e digite o seguinte endereço: 

```
http://localhost:3000/app
```
Caso tudo esteja correto, a mensagem "Your app is running" será retornada.
Com estes passos, você poderá executar o projeto Node em um container Docker sem problemas. Caso encontre algum erro, revise os passos acima ou consulte a documentação do Docker para solucionar possíveis problemas.
