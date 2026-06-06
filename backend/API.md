# API — Conecta Idade

Backend do sistema de gestão de oficinas de inclusão digital.

## Base URL

```
http://localhost:3000/api
```

## Convenções

- Todas as requisições com corpo devem incluir o header `Content-Type: application/json`.
- Todas as respostas são em JSON.
- Datas sempre no formato `YYYY-MM-DD` (ex: `"2025-03-15"`).
- Em caso de erro de validação, a resposta tem o formato:
  ```json
  { "erro": "Dados inválidos", "campos": ["mensagem do campo 1", "..."] }
  ```
- Em caso de recurso não encontrado: `{ "erro": "..." }` com status `404`.
- Exclusões bem-sucedidas retornam status `204` sem corpo.

---

## Participantes

### `GET /api/participantes`

Lista todos os participantes. Aceita filtro opcional por nome.

**Query params**

| Parâmetro | Tipo   | Obrigatório | Descrição                              |
|-----------|--------|-------------|----------------------------------------|
| `nome`    | string | Não         | Filtra por nome (busca parcial, case-insensitive) |

**Exemplo de resposta** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria da Silva",
    "telefone": "(61) 99999-0001",
    "email": "maria@email.com",
    "dataNascimento": "1955-04-10",
    "observacoes": null,
    "criadoEm": "2025-03-15T10:00:00.000Z"
  }
]
```

---

### `GET /api/participantes/:id`

Retorna um participante pelo ID.

**Resposta** `200 OK` — objeto do participante  
**Resposta** `404` — `{ "erro": "Participante não encontrado" }`

---

### `POST /api/participantes`

Cria um novo participante.

**Corpo da requisição**

| Campo           | Tipo   | Obrigatório | Descrição                            |
|-----------------|--------|-------------|--------------------------------------|
| `nome`          | string | Sim         | Nome completo                        |
| `dataNascimento`| string | Sim         | Data no formato `YYYY-MM-DD`         |
| `telefone`      | string | Condicional | Ao menos `telefone` ou `email`       |
| `email`         | string | Condicional | Ao menos `telefone` ou `email`       |
| `observacoes`   | string | Não         | Informações adicionais               |

**Exemplo**

```json
{
  "nome": "João Ferreira",
  "dataNascimento": "1950-07-22",
  "telefone": "(61) 98888-1234",
  "email": "joao@email.com",
  "observacoes": "Possui dificuldade de visão"
}
```

**Resposta** `201 Created` — objeto criado com `id` e `criadoEm`  
**Resposta** `400` — campos obrigatórios ausentes ou inválidos

---

### `PUT /api/participantes/:id`

Atualiza os dados de um participante. Todos os campos são opcionais; só os enviados serão sobrescritos.

**Corpo da requisição** — mesmos campos do `POST`, todos opcionais

**Resposta** `200 OK` — objeto atualizado  
**Resposta** `400` — campo enviado com valor inválido  
**Resposta** `404` — participante não encontrado

---

### `DELETE /api/participantes/:id`

Remove um participante.

**Resposta** `204 No Content`  
**Resposta** `404` — participante não encontrado

---

## Oficinas

### `GET /api/oficinas`

Lista todas as oficinas. Aceita filtro opcional por título.

**Query params**

| Parâmetro | Tipo   | Obrigatório | Descrição                               |
|-----------|--------|-------------|-----------------------------------------|
| `titulo`  | string | Não         | Filtra por título (busca parcial, case-insensitive) |

**Exemplo de resposta** `200 OK`

```json
[
  {
    "id": 1,
    "titulo": "Introdução ao Smartphone",
    "descricao": "Primeiros passos com aparelhos Android",
    "educador": "Ana Beatriz",
    "dataInicio": "2025-03-01",
    "dataFim": "2025-03-30",
    "cargaHoraria": 8,
    "criadoEm": "2025-02-20T14:00:00.000Z"
  }
]
```

---

### `GET /api/oficinas/:id`

Retorna uma oficina pelo ID.

**Resposta** `200 OK` — objeto da oficina  
**Resposta** `404` — `{ "erro": "Oficina não encontrada" }`

---

### `POST /api/oficinas`

Cria uma nova oficina.

**Corpo da requisição**

| Campo         | Tipo   | Obrigatório | Descrição                              |
|---------------|--------|-------------|----------------------------------------|
| `titulo`      | string | Sim         | Título da oficina                      |
| `educador`    | string | Sim         | Nome do educador/voluntário responsável|
| `dataInicio`  | string | Sim         | Data de início no formato `YYYY-MM-DD` |
| `cargaHoraria`| number | Sim         | Carga horária total em horas (> 0)     |
| `descricao`   | string | Não         | Descrição do conteúdo                  |
| `dataFim`     | string | Não         | Data de encerramento `YYYY-MM-DD`      |

**Exemplo**

```json
{
  "titulo": "Uso do WhatsApp",
  "educador": "Carlos Mendes",
  "dataInicio": "2025-04-05",
  "dataFim": "2025-04-26",
  "cargaHoraria": 6,
  "descricao": "Mensagens, chamadas e grupos"
}
```

**Resposta** `201 Created` — objeto criado  
**Resposta** `400` — campos obrigatórios ausentes ou inválidos

---

### `PUT /api/oficinas/:id`

Atualiza os dados de uma oficina. Todos os campos são opcionais.

**Corpo da requisição** — mesmos campos do `POST`, todos opcionais

**Resposta** `200 OK` — objeto atualizado  
**Resposta** `400` — campo enviado com valor inválido  
**Resposta** `404` — oficina não encontrada

---

### `DELETE /api/oficinas/:id`

Remove uma oficina.

**Resposta** `204 No Content`  
**Resposta** `404` — oficina não encontrada

---

## Presenças

### `GET /api/presencas`

Lista todos os registros de presença.

**Exemplo de resposta** `200 OK`

```json
[
  {
    "id": 1,
    "participanteId": 1,
    "oficinaId": 2,
    "data": "2025-04-05",
    "presente": true
  }
]
```

---

### `GET /api/presencas/oficina/:oficinaId`

Lista todas as presenças de uma oficina específica.

**Resposta** `200 OK` — array de presenças da oficina

---

### `GET /api/presencas/participante/:participanteId`

Lista todas as presenças de um participante específico.

**Resposta** `200 OK` — array de presenças do participante

---

### `POST /api/presencas`

Registra a presença de um participante em uma oficina.

**Corpo da requisição**

| Campo            | Tipo    | Obrigatório | Descrição                              |
|------------------|---------|-------------|----------------------------------------|
| `participanteId` | number  | Sim         | ID de um participante cadastrado       |
| `oficinaId`      | number  | Sim         | ID de uma oficina cadastrada           |
| `data`           | string  | Sim         | Data da aula no formato `YYYY-MM-DD`   |
| `presente`       | boolean | Sim         | `true` se compareceu, `false` se faltou|

**Exemplo**

```json
{
  "participanteId": 1,
  "oficinaId": 2,
  "data": "2025-04-05",
  "presente": true
}
```

**Resposta** `201 Created` — objeto criado  
**Resposta** `400` — campos obrigatórios ausentes ou inválidos  
**Resposta** `404` — participante ou oficina referenciado não existe

---

### `DELETE /api/presencas/:id`

Remove um registro de presença.

**Resposta** `204 No Content`  
**Resposta** `404` — presença não encontrada

---

## Progressos

### `GET /api/progressos`

Lista todos os registros de progresso.

**Exemplo de resposta** `200 OK`

```json
[
  {
    "id": 1,
    "participanteId": 1,
    "oficinaId": 2,
    "nota": "Bom",
    "observacoes": "Aprendeu a enviar fotos pelo WhatsApp",
    "registradoEm": "2025-04-10T09:30:00.000Z"
  }
]
```

---

### `GET /api/progressos/:id`

Retorna um registro de progresso pelo ID.

**Resposta** `200 OK` — objeto do progresso  
**Resposta** `404` — `{ "erro": "Progresso não encontrado" }`

---

### `GET /api/progressos/participante/:participanteId`

Lista todos os registros de progresso de um participante.

**Resposta** `200 OK` — array de progressos do participante

---

### `GET /api/progressos/oficina/:oficinaId`

Lista todos os registros de progresso de uma oficina.

**Resposta** `200 OK` — array de progressos da oficina

---

### `POST /api/progressos`

Registra o progresso de um participante em uma oficina.

**Corpo da requisição**

| Campo            | Tipo   | Obrigatório | Descrição                              |
|------------------|--------|-------------|----------------------------------------|
| `participanteId` | number | Sim         | ID de um participante cadastrado       |
| `oficinaId`      | number | Sim         | ID de uma oficina cadastrada           |
| `nota`           | string | Não         | Avaliação qualitativa ou nota          |
| `observacoes`    | string | Não         | Observações livres sobre o progresso   |

**Exemplo**

```json
{
  "participanteId": 1,
  "oficinaId": 2,
  "nota": "Ótimo",
  "observacoes": "Participou ativamente e tirou dúvidas dos colegas"
}
```

**Resposta** `201 Created` — objeto criado com `registradoEm`  
**Resposta** `400` — campos obrigatórios ausentes ou inválidos  
**Resposta** `404` — participante ou oficina referenciado não existe

---

### `PUT /api/progressos/:id`

Atualiza um registro de progresso. Todos os campos são opcionais.

**Corpo da requisição**

| Campo         | Tipo   | Obrigatório | Descrição                   |
|---------------|--------|-------------|-----------------------------|
| `nota`        | string | Não         | Nova avaliação              |
| `observacoes` | string | Não         | Novas observações           |

**Resposta** `200 OK` — objeto atualizado  
**Resposta** `404` — progresso não encontrado

---

### `DELETE /api/progressos/:id`

Remove um registro de progresso.

**Resposta** `204 No Content`  
**Resposta** `404` — progresso não encontrado
