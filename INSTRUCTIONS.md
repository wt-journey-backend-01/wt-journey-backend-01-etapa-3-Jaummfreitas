# Instruções de Configuração e Execução

Este documento contém as instruções para configurar e executar o projeto Sistema de Gestão Policial.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- Docker e Docker Compose
- Git

## 1. Configuração Inicial

### 1.1 Clone o repositório e instale as dependências

```bash
git clone https://github.com/wt-journey-backend-01/wt-journey-backend-01-etapa-3-Jaummfreitas.git
cd wt-journey-backend-01-etapa-3-Jaummfreitas
npm install
```

### 1.2 Configuração das variáveis de ambiente

O arquivo `.env` já está configurado com as seguintes variáveis:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
```

## 2. Configuração do Banco de Dados

### 2.1 Subir o banco com Docker

Execute o comando para subir o container PostgreSQL:

```bash
docker-compose up -d
```

Este comando irá:
- Criar e iniciar o container PostgreSQL
- Configurar o banco `policia_db`
- Expor a porta 5432 para conexão local

### 2.2 Verificar se o container está rodando

```bash
docker-compose ps
```

Você deve ver o container `postgres-database` em execução.

## 3. Configuração das Tabelas

### 3.1 Executar migrations

As migrations criam as tabelas `agentes` e `casos`:

```bash
npx knex migrate:latest
```

### 3.2 Verificar o status das migrations

```bash
npx knex migrate:status
```

## 4. Popular o Banco com Dados

### 4.1 Executar seeds

Os seeds inserem dados iniciais nas tabelas:

```bash
npx knex seed:run
```

Isso irá inserir:
- 3 agentes de exemplo
- 4 casos de exemplo

## 5. Executar a Aplicação

### 5.1 Iniciar o servidor

```bash
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

### 5.2 Acessar a documentação Swagger

Abra o navegador e acesse: `http://localhost:3000/api-docs`

## 6. Comandos Úteis

### Parar o banco de dados
```bash
docker-compose down
```

### Parar e remover volumes (apaga dados)
```bash
docker-compose down -v
```

### Reverter última migration
```bash
npx knex migrate:rollback
```

### Ver logs do container
```bash
docker-compose logs postgres-db
```

## 7. Estrutura do Banco

### Tabela `agentes`
- `id` (integer, auto-increment, primary key)
- `nome` (string, not null)
- `dataDeIncorporacao` (string, not null)
- `cargo` (string, not null)

### Tabela `casos`
- `id` (integer, auto-increment, primary key)
- `titulo` (string, not null)
- `descricao` (text, not null)
- `status` (enum: 'aberto', 'solucionado', not null)
- `agenteId` (integer, foreign key para agentes.id, not null)

## 8. Endpoints da API

### Agentes
- `GET /agentes` - Lista todos os agentes
- `GET /agentes/:id` - Busca agente por ID
- `POST /agentes` - Cria novo agente
- `PUT /agentes/:id` - Atualiza agente completo
- `PATCH /agentes/:id` - Atualiza agente parcial
- `DELETE /agentes/:id` - Remove agente

### Casos
- `GET /casos` - Lista todos os casos
- `GET /casos/:id` - Busca caso por ID
- `POST /casos` - Cria novo caso
- `PUT /casos/:id` - Atualiza caso completo
- `PATCH /casos/:id` - Atualiza caso parcial
- `DELETE /casos/:id` - Remove caso

## 9. Troubleshooting

### Erro de conexão com banco
1. Verifique se o Docker está rodando
2. Verifique se o container PostgreSQL está ativo: `docker-compose ps`
3. Aguarde alguns segundos após subir o container

### Erro nas migrations
1. Verifique se o banco está rodando
2. Certifique-se de que as variáveis do `.env` estão corretas
3. Se necessário, remova volumes e refaça: `docker-compose down -v && docker-compose up -d`

### Porta já em uso
Se a porta 5432 já estiver em uso, altere no `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Muda para porta 5433 local
```
