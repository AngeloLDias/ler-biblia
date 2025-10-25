# Migração de SQLite para PostgreSQL

## ✅ Alterações Realizadas

### 1. Dependências Instaladas
- ✅ Instalado o driver `pg` para PostgreSQL

### 2. Arquivos de Configuração Criados
- ✅ `backend/.env` - Configurações do banco de dados
- ✅ `backend/.env.example` - Exemplo de configurações

### 3. Arquivos Atualizados

#### Backend Principal
- ✅ `backend/src/app.module.ts` - Configuração do TypeORM atualizada para PostgreSQL

#### Scripts de Seed
- ✅ `backend/src/database/seeds/seed.ts`
- ✅ `backend/src/database/seeds/import-from-api.ts`
- ✅ `backend/src/database/seeds/import-from-github.ts`
- ✅ `backend/src/database/seeds/import-bible.ts`

#### Entidades
- ✅ `backend/src/features/bible/entities/reading-progress.entity.ts` - Tipo `datetime` alterado para `timestamp`

## 📋 Próximos Passos

### 1. Instalar e Configurar PostgreSQL

#### Opção A: Instalação Local (macOS)
```bash
# Instalar PostgreSQL via Homebrew
brew install postgresql@15

# Iniciar o serviço
brew services start postgresql@15

# Criar o banco de dados
createdb ler_biblia

# Ou usando psql
psql postgres
CREATE DATABASE ler_biblia;
\q
```

#### Opção B: Usar Docker
```bash
# Criar e iniciar container PostgreSQL
docker run --name ler-biblia-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ler_biblia \
  -p 5432:5432 \
  -d postgres:15

# Verificar se está rodando
docker ps
```

#### Opção C: Usar Serviço em Nuvem
- **Supabase** (gratuito): https://supabase.com
- **Railway** (gratuito): https://railway.app
- **Render** (gratuito): https://render.com
- **Neon** (gratuito): https://neon.tech

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `backend/.env` com suas credenciais:

```env
# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost          # ou o host do seu serviço
DB_PORT=5432
DB_USERNAME=postgres       # seu usuário
DB_PASSWORD=postgres       # sua senha
DB_DATABASE=ler_biblia

# Application
PORT=3000
NODE_ENV=development
```

### 3. Executar Migrações

```bash
cd backend

# O TypeORM criará as tabelas automaticamente (synchronize: true)
npm run start:dev

# Ou se preferir rodar em produção
npm run build
npm run start:prod
```

### 4. Popular o Banco de Dados

```bash
cd backend

# Opção 1: Seed básico (traduções, livros, versículos de exemplo)
npm run seed

# Opção 2: Importar Bíblia completa do GitHub (recomendado)
npm run import-bible-github nvi

# Opção 3: Importar de outra fonte
npm run import-bible
```

### 5. Verificar a Migração

```bash
# Conectar ao PostgreSQL
psql -U postgres -d ler_biblia

# Verificar tabelas criadas
\dt

# Verificar dados
SELECT COUNT(*) FROM translations;
SELECT COUNT(*) FROM books;
SELECT COUNT(*) FROM verses;

# Sair
\q
```

## 🔄 Migrar Dados Existentes do SQLite (Opcional)

Se você já tem dados no SQLite e quer migrá-los:

### Opção 1: Usar pgloader (Recomendado)
```bash
# Instalar pgloader
brew install pgloader

# Criar arquivo de configuração
cat > migrate.load << EOF
LOAD DATABASE
  FROM sqlite://bible.db
  INTO postgresql://postgres:postgres@localhost/ler_biblia
  WITH include drop, create tables, create indexes, reset sequences
  SET work_mem to '16MB', maintenance_work_mem to '512 MB';
EOF

# Executar migração
pgloader migrate.load
```

### Opção 2: Export/Import Manual
```bash
# 1. Exportar dados do SQLite para SQL
sqlite3 bible.db .dump > backup.sql

# 2. Ajustar o SQL para PostgreSQL (pode precisar de edições manuais)
# 3. Importar no PostgreSQL
psql -U postgres -d ler_biblia < backup.sql
```

### Opção 3: Usar Script Customizado
Criar um script Node.js que lê do SQLite e insere no PostgreSQL.

## 🧪 Testar a Aplicação

```bash
cd backend
npm run start:dev

# Em outro terminal, testar a API
curl http://localhost:3000/api/translations
curl http://localhost:3000/api/books
curl http://localhost:3000/api/verses/1/1/1
```

## 🚀 Deploy em Produção

### Atualizar Variáveis de Ambiente
No seu serviço de deploy (Render, Railway, etc.), configure:

```env
DB_TYPE=postgres
DB_HOST=seu-host-postgres.com
DB_PORT=5432
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
DB_DATABASE=ler_biblia
NODE_ENV=production
```

### ⚠️ IMPORTANTE: Desabilitar Synchronize em Produção

Antes do deploy, edite `backend/src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  // ... outras configurações
  synchronize: process.env.NODE_ENV !== 'production', // ← Alterar esta linha
  // ...
})
```

## 📝 Notas Importantes

1. **Backup**: Sempre faça backup do `bible.db` antes de qualquer migração
2. **Synchronize**: Em produção, use migrations ao invés de `synchronize: true`
3. **Performance**: PostgreSQL é muito mais rápido para queries complexas
4. **Índices**: Os índices definidos nas entidades serão criados automaticamente
5. **Tipos**: PostgreSQL tem tipos de dados mais ricos que SQLite

## 🐛 Troubleshooting

### Erro: "password authentication failed"
- Verifique as credenciais no `.env`
- Verifique se o PostgreSQL está rodando: `pg_isready`

### Erro: "database does not exist"
- Crie o banco: `createdb ler_biblia`

### Erro: "connection refused"
- Verifique se o PostgreSQL está rodando
- Verifique a porta (padrão: 5432)

### Erro ao importar dados
- Verifique se as tabelas foram criadas
- Verifique se há dados duplicados
- Limpe as tabelas: `TRUNCATE TABLE verses, books, translations CASCADE;`

## 📚 Recursos Adicionais

- [TypeORM PostgreSQL Documentation](https://typeorm.io/#/connection-options/postgres-connection-options)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Migrating from SQLite to PostgreSQL](https://pgloader.io/)

