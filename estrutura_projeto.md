## Estrutura de pastas da api (Layered Architecture)
/
├── src/
│   ├── config/             # Configurações (DB, Variáveis de Ambiente)
│   ├── controllers/        # Requisições e Respostas
│   ├── services/           # Regras de negócios
│   ├── repositories/       # Consultas ao banco de dados
│   ├── models/             # Modelos de dados do banco de dados
│   ├── routes/             # Definição das rotas
│   └── server.ts           # Inicialização do servidor
