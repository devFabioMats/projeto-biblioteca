# 📚 Projeto Biblioteca

Sistema de gerenciamento de acervo de uma biblioteca, com CRUD de livros e
bibliotecários. Front-end em HTML/CSS/JS puro (sem frameworks) e back-end em
ASP.NET Core Web API com Swagger.

Este projeto foi criado como base para aulas/minicurso de desenvolvimento
full stack (front-end + back-end .NET), servindo de exemplo prático de uma
aplicação CRUD completa, ponta a ponta.

## Contexto

A aplicação simula o sistema interno de uma biblioteca:

- Um **bibliotecário** faz login no sistema.
- Ele cadastra, edita, pesquisa e exclui **livros** do acervo.
- Cada livro tem um status: **Disponível** ou **Emprestado**.
- A tela inicial mostra um dashboard com total de livros, livros cadastrados
  no último mês e livros emprestados.
- Existe uma tela de **Relatórios** com uma listagem imprimível dos livros.
- Existe uma tela de **Bibliotecários** (CRUD separado, sem relação com o
  cadastro de livros) para gerenciar quem tem acesso ao sistema.

## Estrutura do repositório

```
projeto-biblioteca/
├── backend/                    -> API .NET (ASP.NET Core Web API)
│   ├── Biblioteca.sln
│   └── Biblioteca.Api/
│       ├── Controllers/        -> um controller por entidade (Book, Librarian)
│       ├── Models/             -> entidades e DTOs
│       ├── Data/               -> "banco de dados" em arquivos JSON
│       │   └── Storage/        -> books.json, librarians.json (dados persistidos)
│       └── Program.cs
└── frontend/                   -> HTML/CSS/JS puro
    ├── index.html              -> redireciona para pages/login.html
    ├── pages/                  -> uma página por tela
    └── assets/
        ├── css/                -> estilos
        └── js/                 -> um script por tela + config.js/auth.js
```

## Tecnologias utilizadas

**Back-end**
- .NET 10 (LTS)
- ASP.NET Core Web API (Controllers)
- Swashbuckle (Swagger / OpenAPI)
- Persistência em arquivos JSON (sem banco de dados relacional por enquanto)

**Front-end**
- HTML5
- CSS3 (um único arquivo de estilo, sem frameworks)
- JavaScript puro (Fetch API, sem frameworks/bibliotecas)
- Google Material Symbols (ícones, via CDN)

## Entidades

**Book** (livro, CRUD principal)
```
{ id, status, title, author, year, genre, publisher, isbn, synopsis, notes }
```

**Librarian** (bibliotecário, usuário do sistema)
```
{ id, name, email, password }
```

## Endpoints da API

Prefixo base: `lib-api` (definido via `[Route("lib-api/[controller]")]` em cada controller).

| Método | Rota                              | Descrição                       |
|--------|-----------------------------------|----------------------------------|
| POST   | `/lib-api/Librarian/Login`        | Login do bibliotecário           |
| GET    | `/lib-api/Book`                   | Lista todos os livros            |
| GET    | `/lib-api/Book/{id}`              | Busca um livro por id            |
| GET    | `/lib-api/Book/Dashboard`         | Totais para a tela inicial       |
| GET    | `/lib-api/Book/Search?title=...`  | Pesquisa livros por título       |
| POST   | `/lib-api/Book`                   | Cria um livro                    |
| PUT    | `/lib-api/Book/{id}`               | Atualiza um livro                |
| DELETE | `/lib-api/Book/{id}`               | Exclui um livro                  |
| GET    | `/lib-api/Librarian`               | Lista todos os bibliotecários    |
| GET    | `/lib-api/Librarian/{id}`          | Busca um bibliotecário por id    |
| POST   | `/lib-api/Librarian`               | Cria um bibliotecário            |
| PUT    | `/lib-api/Librarian/{id}`          | Atualiza um bibliotecário        |
| DELETE | `/lib-api/Librarian/{id}`          | Exclui um bibliotecário          |

## Como rodar o back-end (API)

Pré-requisito: .NET 10 SDK instalado.

**Pelo Visual Studio:**
1. Abra `backend/Biblioteca.sln`.
2. Dê F5 (ou Ctrl+F5). O navegador abre sozinho em `/swagger`.

**Pelo terminal:**
```
cd backend/Biblioteca.Api
dotnet run
```

A API sobe em:
- `https://localhost:7180` (HTTPS)
- `http://localhost:5180` (HTTP)

Swagger disponível em `https://localhost:7180/swagger`.

Os dados ficam salvos em `backend/Biblioteca.Api/Data/Storage/*.json` e
persistem entre execuções (para resetar, apague o conteúdo desses arquivos
e reinicie a API — eles são recriados com dados de exemplo).

## Como rodar o front-end

O front-end é HTML/CSS/JS puro, sem build. Não abra o `login.html` direto
com duplo clique (`file://`) — use um servidor local para evitar problemas
de CORS/paths:

**Opção 1 — VS Code + Live Server (recomendado)**
1. Abra a pasta `frontend/` no VS Code.
2. Botão direito em `pages/login.html` → **Open with Live Server**.

**Opção 2 — servidor local via terminal**
```
cd frontend
python -m http.server 5500
```
ou
```
npx serve -l 5500
```
Depois acesse `http://localhost:5500/pages/login.html`.

⚠️ A API precisa estar rodando (`dotnet run`/F5) para o login e as telas
funcionarem de verdade — sem ela, as chamadas `fetch` falham.

## Login de teste

- **Email:** `fabio@gmail.com`
- **Senha:** `123`

(usuário criado automaticamente em `Data/Storage/librarians.json` na
primeira execução da API)

## Licença

Este projeto está sob a licença MIT (ver `LICENSE`).
