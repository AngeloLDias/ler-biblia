# 🚀 Deploy do Backend - Guia Completo

## 📋 Opções de Hospedagem

### 1. Railway (Recomendado) ⭐
- ✅ Mais fácil de configurar
- ✅ $5 de crédito grátis/mês
- ✅ Deploy automático do GitHub
- ✅ Suporte a SQLite
- ✅ Logs em tempo real

### 2. Render
- ✅ Plano gratuito disponível
- ✅ Deploy automático
- ⚠️ Pode hibernar após inatividade (plano grátis)

### 3. Heroku
- ⚠️ Não tem mais plano gratuito
- ✅ Muito estável
- ✅ Boa documentação

---

## 🚂 Opção 1: Deploy no Railway (Recomendado)

### Passo 1: Preparar o Projeto

**1.1. Commit das mudanças:**
```bash
git add .
git commit -m "Preparar backend para deploy"
git push origin main
```

**1.2. Verificar arquivos criados:**
- ✅ `backend/Procfile`
- ✅ `backend/railway.json`
- ✅ `backend/Dockerfile`
- ✅ `backend/.dockerignore`

### Passo 2: Criar Conta no Railway

**2.1. Acessar:**
- Vá para https://railway.app
- Clique em "Login"
- Faça login com GitHub

**2.2. Autorizar:**
- Autorize o Railway a acessar seus repositórios

### Passo 3: Criar Novo Projeto

**3.1. Novo Projeto:**
- Clique em "New Project"
- Selecione "Deploy from GitHub repo"
- Escolha o repositório `ler-biblia`

**3.2. Configurar:**
```
Root Directory: backend
Build Command: npm install && npm run build
Start Command: npm run start:prod
```

**3.3. Variáveis de Ambiente:**
Adicione as seguintes variáveis:
```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://ler-biblia.vercel.app
```

### Passo 4: Deploy

**4.1. Deploy Automático:**
- Railway detectará automaticamente o `railway.json`
- O build começará automaticamente
- Aguarde 3-5 minutos

**4.2. Verificar Logs:**
- Clique em "Deployments"
- Veja os logs em tempo real
- Procure por: "Application is running on..."

**4.3. Obter URL:**
- Vá em "Settings" → "Domains"
- Clique em "Generate Domain"
- Copie a URL (ex: `ler-biblia-backend.up.railway.app`)

### Passo 5: Importar Bíblia

**5.1. Via Railway CLI:**
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Rodar importação
railway run npm run import-bible-github:prod nvi
```

**5.2. Ou fazer upload do banco:**
```bash
# Copiar bible.db para o servidor
railway up bible.db
```

### Passo 6: Testar

```bash
# Testar API
curl https://sua-url.railway.app/v1/bible/translations

# Deve retornar JSON com traduções
```

---

## 🎨 Opção 2: Deploy no Render

### Passo 1: Preparar

```bash
git add .
git commit -m "Preparar backend para deploy"
git push origin main
```

### Passo 2: Criar Conta

- Acesse: https://render.com
- Faça login com GitHub

### Passo 3: Novo Web Service

**3.1. Criar:**
- Clique em "New +"
- Selecione "Web Service"
- Conecte seu repositório

**3.2. Configurar:**
```
Name: ler-biblia-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run start:prod
Plan: Free
```

**3.3. Variáveis de Ambiente:**
```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://ler-biblia.vercel.app
```

**3.4. Deploy:**
- Clique em "Create Web Service"
- Aguarde o build (5-10 minutos)

### Passo 4: Obter URL

- Copie a URL (ex: `ler-biblia-backend.onrender.com`)

### Passo 5: Importar Bíblia

**Via SSH (Render):**
```bash
# Acessar shell
# No dashboard do Render, clique em "Shell"

# Rodar importação
npm run import-bible-github:prod nvi
```

---

## 🐳 Opção 3: Deploy com Docker (Avançado)

### Passo 1: Build Local

```bash
cd backend

# Build da imagem
docker build -t ler-biblia-backend .

# Testar localmente
docker run -p 3000:3000 ler-biblia-backend
```

### Passo 2: Deploy

**Railway:**
- Railway detecta Dockerfile automaticamente
- Faz build e deploy

**Render:**
- Selecione "Docker" como runtime
- Render usa o Dockerfile

**DigitalOcean App Platform:**
```bash
# Instalar doctl
brew install doctl

# Login
doctl auth init

# Deploy
doctl apps create --spec backend/app.yaml
```

---

## 🗄️ Banco de Dados em Produção

### Opção 1: SQLite no Servidor (Simples)

**Vantagens:**
- ✅ Sem configuração adicional
- ✅ Funciona out-of-the-box

**Desvantagens:**
- ⚠️ Dados perdidos se servidor reiniciar (Railway/Render)
- ⚠️ Não escala horizontalmente

**Solução:**
```bash
# Fazer backup periódico
railway run npm run backup-db

# Ou usar volume persistente (Railway)
# Settings → Volumes → Add Volume
# Mount Path: /app/data
```

### Opção 2: Turso (SQLite na Nuvem) ⭐

**Vantagens:**
- ✅ SQLite compatível
- ✅ Plano gratuito generoso
- ✅ Backup automático
- ✅ Escala globalmente

**Setup:**
```bash
# Instalar Turso CLI
brew install tursodatabase/tap/turso

# Login
turso auth login

# Criar banco
turso db create ler-biblia

# Obter URL e token
turso db show ler-biblia

# Adicionar variáveis no Railway/Render
DATABASE_URL=libsql://ler-biblia-xxx.turso.io
DATABASE_AUTH_TOKEN=seu-token-aqui
```

**Atualizar código:**
```typescript
// backend/src/database/database.module.ts
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
```

### Opção 3: PostgreSQL (Railway/Render)

**Railway:**
```bash
# No dashboard
# New → Database → PostgreSQL
# Copiar DATABASE_URL
```

**Render:**
```bash
# New → PostgreSQL
# Copiar Internal Database URL
```

**Migrar de SQLite para PostgreSQL:**
```bash
# Instalar dependências
npm install pg

# Atualizar TypeORM config
# Mudar type: 'sqlite' para type: 'postgres'
```

---

## 🔧 Configuração Avançada

### Custom Domain

**Railway:**
```bash
# Settings → Domains → Custom Domain
# Adicionar: api.seusite.com
# Configurar DNS:
# CNAME api → seu-projeto.railway.app
```

**Render:**
```bash
# Settings → Custom Domain
# Adicionar: api.seusite.com
# Configurar DNS conforme instruções
```

### HTTPS

- ✅ Railway: HTTPS automático
- ✅ Render: HTTPS automático
- ✅ Certificado SSL gratuito

### Logs

**Railway:**
```bash
# Via CLI
railway logs

# Via Dashboard
Deployments → View Logs
```

**Render:**
```bash
# Via Dashboard
Logs → View Logs
```

### Monitoramento

**Railway:**
- Metrics → CPU, Memory, Network
- Alerts → Configure alertas

**Render:**
- Metrics → Response time, CPU, Memory
- Health checks automáticos

---

## 🔗 Conectar Frontend ao Backend

### Passo 1: Obter URL do Backend

```bash
# Railway
https://ler-biblia-backend.up.railway.app

# Render
https://ler-biblia-backend.onrender.com
```

### Passo 2: Configurar no Vercel

**Via Dashboard:**
```
Settings → Environment Variables
Name: VITE_API_URL
Value: https://ler-biblia-backend.up.railway.app
```

**Via CLI:**
```bash
vercel env add VITE_API_URL production
# Digite a URL do backend
```

### Passo 3: Redeploy Frontend

```bash
vercel --prod
```

### Passo 4: Testar

```bash
# Acessar frontend
https://ler-biblia.vercel.app

# Verificar se API responde
# Abrir DevTools → Network
# Verificar chamadas para o backend
```

---

## 🧪 Testar Deploy

### 1. Health Check

```bash
curl https://sua-url.railway.app/api
# Deve retornar Swagger UI
```

### 2. API Endpoints

```bash
# Traduções
curl https://sua-url.railway.app/v1/bible/translations

# Livros
curl https://sua-url.railway.app/v1/bible/books

# Capítulo
curl "https://sua-url.railway.app/v1/bible/chapter?translationId=3&bookId=67&chapter=1"
```

### 3. Integração

```bash
# Acessar frontend
https://ler-biblia.vercel.app

# Testar:
- ✅ Carregar traduções
- ✅ Carregar livros
- ✅ Carregar capítulos
- ✅ Busca funciona
```

---

## 🐛 Troubleshooting

### Erro: "Application failed to start"

**Verificar:**
```bash
# Logs
railway logs

# Procurar por erros
# Verificar se PORT está configurado
# Verificar se build foi bem-sucedido
```

### Erro: "Module not found"

**Solução:**
```bash
# Verificar package.json
# Garantir que todas as dependências estão em "dependencies"
# Não em "devDependencies"
```

### Erro: "Database not found"

**Solução:**
```bash
# Fazer upload do bible.db
railway up bible.db

# Ou rodar importação
railway run npm run import-bible-github:prod nvi
```

### Erro: "CORS policy"

**Solução:**
```typescript
// backend/src/main.ts
app.enableCors({
  origin: [
    'https://ler-biblia.vercel.app',
    'https://seu-dominio.com'
  ],
  credentials: true,
});
```

---

## 💰 Custos

### Railway
- **Starter:** $5 de crédito/mês (grátis)
- **Developer:** $5/mês + uso
- **Estimativa:** ~$0-5/mês para este projeto

### Render
- **Free:** Grátis (com limitações)
- **Starter:** $7/mês
- **Estimativa:** $0-7/mês

### Turso (Banco)
- **Starter:** Grátis
- **Scaler:** $29/mês
- **Estimativa:** $0/mês (plano grátis suficiente)

---

## ✅ Checklist

### Preparação
- [ ] Código commitado no Git
- [ ] Build local funciona
- [ ] Arquivos de config criados
- [ ] Variáveis de ambiente definidas

### Deploy
- [ ] Conta criada (Railway/Render)
- [ ] Projeto criado
- [ ] Repositório conectado
- [ ] Build bem-sucedido
- [ ] URL obtida

### Banco de Dados
- [ ] Banco importado ou uploaded
- [ ] Dados verificados
- [ ] Backup configurado

### Integração
- [ ] Frontend configurado
- [ ] CORS configurado
- [ ] Testes passando

---

## 🎉 Conclusão

Após seguir este guia, você terá:
- ✅ Backend rodando no Railway/Render
- ✅ Banco de dados em produção
- ✅ API acessível publicamente
- ✅ Frontend conectado ao backend
- ✅ Deploy automático configurado

**URLs finais:**
- Frontend: `https://ler-biblia.vercel.app`
- Backend: `https://ler-biblia-backend.up.railway.app`
- API Docs: `https://ler-biblia-backend.up.railway.app/api`

