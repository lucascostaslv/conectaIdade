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
- Banco de dados: em memória (MVP) / a migrar para banco relacional
- Editor: VS Code

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+

### Back-end

```bash
cd backend
npm install
npm run dev     # desenvolvimento (nodemon)
# ou
npm start       # produção
```

O servidor sobe em `http://localhost:3000`.

### Rotas disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/participantes` | Lista todos os participantes |
| POST | `/api/participantes` | Cria um participante |
| PUT | `/api/participantes/:id` | Atualiza um participante |
| DELETE | `/api/participantes/:id` | Remove um participante |
| GET | `/api/oficinas` | Lista todas as oficinas |
| POST | `/api/oficinas` | Cria uma oficina |
| PUT | `/api/oficinas/:id` | Atualiza uma oficina |
| DELETE | `/api/oficinas/:id` | Remove uma oficina |
| GET | `/api/presencas/oficina/:id` | Presenças de uma oficina |
| GET | `/api/presencas/participante/:id` | Presenças de um participante |
| POST | `/api/presencas` | Registra uma presença |
| DELETE | `/api/presencas/:id` | Remove um registro de presença |

> Os dados são mantidos em memória e são resetados ao reiniciar o servidor.

## Avaliação

Relato da equipe da instituição sobre a usabilidade do sistema + formulário de feedback via Google Forms aplicado após a apresentação.
