# Sistema de Gestão de Oficinas de Inclusão Digital

Aplicação web para apoiar a gestão das oficinas de inclusão digital ofertadas por uma instituição à pessoa idosa, substituindo o controle manual por uma solução digital acessível.

## Contexto

A digitalização de serviços essenciais tornou o acesso à internet um requisito de participação social. A população idosa é o grupo mais exposto à exclusão digital: 52,1% das pessoas que não usaram a internet em 2024 são idosas, e entre elas 66,1% citam "não saber usar" como motivo. Este projeto atende diretamente essa lacuna de letramento digital.

## Objetivo

Desenvolver e implantar uma aplicação web que permita à instituição gerenciar suas oficinas de inclusão digital, com:

- CRUD de participantes (idosos 60+) e de oficinas
- Registro de presença
- Acompanhamento do progresso dos participantes
- MVP com front-end, back-end e banco de dados

## Público-alvo

| Alcance | Perfil | Quantidade estimada |
|---------|--------|-------------------|
| Direto | Idosos participantes das oficinas | ~30 pessoas |
| Direto | Educadores/voluntários da instituição | ~4 pessoas |
| Indireto | Familiares e demais atendidos | ~120 pessoas |

## Metodologia

1. Visita diagnóstica à instituição e entrevista com a coordenação
2. Definição de requisitos e escopo
3. Modelagem do banco de dados e prototipação das telas
4. Desenvolvimento do front-end e back-end com integração ao banco
5. Implementação dos CRUDs de participantes e oficinas
6. Testes e ajustes conforme retorno da instituição
7. Apresentação do sistema e orientação de uso à equipe

## ODS Relacionados

- **ODS 4** — Educação de qualidade
- **ODS 10** — Redução das desigualdades

## Stack

- Front-end: HTML + CSS + JavaScript puro
- Back-end: Node.js + Express
- Banco de dados: SQLite via Sequelize
- Editor: VS Code

---

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- Nenhum banco de dados externo necessário — o SQLite é um arquivo local criado automaticamente

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente (opcional)

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

O único campo disponível é `PORT` (padrão `3000`). Se não criar o `.env`, o servidor sobe normalmente na porta 3000.

### 3. Rodar o servidor

```bash
# Modo desenvolvimento — reinicia automaticamente ao salvar
npm run dev

# Modo produção
npm start
```

Na primeira execução o Sequelize cria o arquivo `database.sqlite` e as tabelas automaticamente. Nenhum comando extra de migração é necessário.

### 4. Abrir o sistema

Acesse **http://localhost:3000** no navegador.

> Se estiver usando o Live Server do VS Code (porta 5500), o sistema ainda funciona — as chamadas de API apontam diretamente para `http://localhost:3000/api`. O servidor Express precisa estar rodando em paralelo.

---

## Estrutura do projeto

```
backend/
├── server.js                   # Ponto de entrada — sincroniza o banco e sobe o Express
├── database.sqlite             # Banco de dados SQLite (gerado automaticamente, não versionado)
├── .env.example                # Variáveis de ambiente disponíveis
└── src/
    ├── app.js                  # Configuração do Express (middlewares, rotas, CORS)
    ├── database/
    │   └── connection.js       # Instância do Sequelize
    ├── models/
    │   ├── index.js            # Registra associações entre entidades
    │   ├── Participante.js
    │   ├── Oficina.js
    │   ├── Presenca.js
    │   └── Progresso.js
    ├── repositories/           # Camada de acesso ao banco (wraps do Sequelize)
    ├── controllers/            # Validação de entrada e respostas HTTP
    └── routes/                 # Mapeamento de verbos HTTP para controllers

frontend/
├── index.html                  # Tela inicial com painel de resumo
├── css/style.css
├── js/
│   ├── main.js                 # Funções compartilhadas e helper de fetch
│   ├── participantes.js
│   ├── oficinas.js
│   ├── presencas.js
│   └── progressos.js
└── pages/
    ├── participantes.html
    ├── oficinas.html
    ├── presencas.html
    └── progressos.html
```

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/participantes` | Lista (aceita `?nome=` para filtrar) |
| GET | `/api/participantes/:id` | Busca por ID |
| POST | `/api/participantes` | Cria participante |
| PUT | `/api/participantes/:id` | Atualiza participante |
| DELETE | `/api/participantes/:id` | Remove participante |
| GET | `/api/oficinas` | Lista (aceita `?titulo=` para filtrar) |
| GET | `/api/oficinas/:id` | Busca por ID |
| POST | `/api/oficinas` | Cria oficina |
| PUT | `/api/oficinas/:id` | Atualiza oficina |
| DELETE | `/api/oficinas/:id` | Remove oficina |
| GET | `/api/presencas` | Lista todas as presenças |
| GET | `/api/presencas/oficina/:oficinaId` | Presenças de uma oficina |
| GET | `/api/presencas/participante/:participanteId` | Presenças de um participante |
| POST | `/api/presencas` | Registra presença |
| DELETE | `/api/presencas/:id` | Remove presença |
| GET | `/api/progressos` | Lista todos os progressos |
| GET | `/api/progressos/:id` | Busca por ID |
| GET | `/api/progressos/participante/:participanteId` | Progressos de um participante |
| GET | `/api/progressos/oficina/:oficinaId` | Progressos de uma oficina |
| POST | `/api/progressos` | Cria progresso |
| PUT | `/api/progressos/:id` | Atualiza progresso |
| DELETE | `/api/progressos/:id` | Remove progresso |

---

## Avaliação

Relato da equipe da instituição sobre a usabilidade do sistema + formulário de feedback via Google Forms aplicado após a apresentação.
