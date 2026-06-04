# CLAUDE.md — Contexto do Projeto

## O que é este projeto

Projeto de extensão universitária (Unidade Curricular de Engenharia de Software / Desenvolvimento Web). O produto é uma **aplicação web de gestão de oficinas de inclusão digital** para uma instituição que atende pessoas idosas (60+) no Distrito Federal.

## Objetivo central

Substituir o controle manual das oficinas por um sistema digital com:
- CRUD de participantes e de oficinas
- Registro de presença
- Acompanhamento do progresso dos participantes
- MVP completo: front-end + back-end + banco de dados

## Stack

- Back-end: **Node.js + Express** (JavaScript)
- Front-end: **HTML + CSS + JavaScript** puro (sem framework)
- Banco de dados: **em memória** (por enquanto) — entidades modeladas para facilitar migração futura
- IDE: VS Code

## Estrutura do repositório (inicial)

```
/
├── docs/              # Documentos do projeto de extensão (.docx)
├── README.md
└── CLAUDE.md
```

## Entidades principais do domínio

- **Participante** — idoso inscrito nas oficinas (nome, contato, dados básicos)
- **Oficina** — encontro/turma de inclusão digital (título, data, carga horária, educador)
- **Presença** — relação entre Participante e Oficina em determinada data
- **Progresso** — acompanhamento da evolução do participante ao longo das oficinas

## Decisões e restrições conhecidas

- O sistema será entregue à instituição como MVP; priorizar simplicidade e usabilidade
- Público usuário do sistema: 4 educadores/voluntários (não os idosos — eles são atendidos pelas oficinas)
- A avaliação do projeto inclui feedback da equipe da instituição via formulário Google Forms
- Materiais disponíveis: computadores dos integrantes + infraestrutura da instituição (sala e projetor) para apresentação

## Documentos de referência

- `docs/7. MAPEAMENTO DAS DEMANDAS (grupo).docx` — documento principal com objetivos, justificativa, metodologia e referências
- `docs/8. ROTEIRO PARA RELATÓRIO DE PROJETO DE EXTENSÃO (grupo).docx` — roteiro do relatório final

## O que ainda precisa ser definido

- [ ] Nome da instituição parceira e endereço
- [ ] Integrantes do grupo e matrículas
- [ ] Professor orientador e semestre letivo
- [ ] Cronograma detalhado (ações, responsáveis, datas)
- [ ] Banco de dados real (SQLite, PostgreSQL, etc.) — quando sair do modo em memória
- [ ] Forma de registro das atividades (fotos, vídeos, listas de presença)
- [ ] Período de realização (data de início e fim)
