# 🚀 Deploy na Vercel - Guia Completo

## 📋 Pré-requisitos

1. **Conta na Vercel**
   - Acesse: https://vercel.com
   - Faça login com GitHub, GitLab ou Bitbucket

2. **Repositório Git**
   - Código deve estar em um repositório Git
   - GitHub, GitLab ou Bitbucket

3. **Vercel CLI** (opcional, mas recomendado)
   ```bash
   npm install -g vercel
   ```

## 🎯 Arquitetura do Deploy

### Frontend (Vercel)
- ✅ Vue 3 + Vite
- ✅ Hospedado na Vercel
- ✅ Deploy automático

### Backend (Separado)
- ⚠️ NestJS não roda nativamente na Vercel
- 📌 Opções para o backend:
  1. **Railway** (recomendado)
  2. **Render**
  3. **Heroku**
  4. **DigitalOcean**
  5. **AWS/Google Cloud**

## 📦 Opção 1: Deploy Apenas do Frontend

### Passo 1: Preparar o Projeto

**1.1. Commit das mudanças:**
```bash
git add .
git commit -m "Preparar para deploy na Vercel"
git push origin main
```

**1.2. Verificar arquivos criados:**
- ✅ `vercel.json` (configuração do Vercel)
- ✅ `frontend/.env.production` (variáveis de produção)
- ✅ `frontend/src/config/api.ts` (configuração da API)

### Passo 2: Deploy via Dashboard da Vercel

**2.1. Acessar Vercel:**
- Vá para https://vercel.com/dashboard
- Clique em "Add New Project"

**2.2. Importar Repositório:**
- Selecione seu repositório Git
- Clique em "Import"

**2.3. Configurar Projeto:**
```
Project Name: ler-biblia
Framework Preset: Vite
Root Directory: ./
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/dist
Install Command: npm install
```

**2.4. Variáveis de Ambiente:**
Adicione em "Environment Variables":
```
VITE_API_URL = https://seu-backend.railway.app/api
```
(Substitua pela URL do seu backend)

**2.5. Deploy:**
- Clique em "Deploy"
- Aguarde o build (2-3 minutos)
- Acesse a URL gerada (ex: `ler-biblia.vercel.app`)

### Passo 3: Deploy via CLI (Alternativa)

**3.1. Login:**
```bash
vercel login
```

**3.2. Deploy:**
```bash
# Na raiz do projeto
vercel

# Responda as perguntas:
# Set up and deploy? Yes
# Which scope? Seu usuário
# Link to existing project? No
# Project name? ler-biblia
# In which directory is your code located? ./
```

**3.3. Configurar variáveis:**
```bash
vercel env add VITE_API_URL production
# Digite: https://seu-backend.railway.app/api
```

**3.4. Deploy para produção:**
```bash
vercel --prod
```

## 📦 Opção 2: Deploy do Backend no Railway

### Passo 1: Preparar Backend

**1.1. Criar `backend/Procfile`:**
```
web: npm run start:prod
```

**1.2. Atualizar `backend/package.json`:**
```json
{
  "scripts": {
    "start:prod": "node dist/main.js",
    "build": "nest build"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### Passo 2: Deploy no Railway

**2.1. Acessar Railway:**
- Vá para https://railway.app
- Faça login com GitHub

**2.2. Criar Novo Projeto:**
- Clique em "New Project"
- Selecione "Deploy from GitHub repo"
- Escolha seu repositório

**2.3. Configurar:**
```
Root Directory: backend
Build Command: npm install && npm run build
Start Command: npm run start:prod
```

**2.4. Variáveis de Ambiente:**
```
NODE_ENV=production
PORT=3000
```

**2.5. Deploy:**
- Railway fará o deploy automaticamente
- Copie a URL gerada (ex: `https://ler-biblia-backend.up.railway.app`)

### Passo 3: Conectar Frontend ao Backend

**3.1. Atualizar variável no Vercel:**
```bash
vercel env add VITE_API_URL production
# Digite a URL do Railway: https://ler-biblia-backend.up.railway.app
```

**3.2. Redeploy do frontend:**
```bash
vercel --prod
```

## 🔧 Configuração Avançada

### Custom Domain

**No Vercel:**
1. Vá em "Settings" → "Domains"
2. Adicione seu domínio (ex: `biblia.seusite.com`)
3. Configure DNS conforme instruções

**No Railway:**
1. Vá em "Settings" → "Domains"
2. Adicione domínio customizado
3. Configure DNS

### CORS no Backend

**Atualizar `backend/src/main.ts`:**
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://ler-biblia.vercel.app',
      'https://seu-dominio.com'
    ],
    credentials: true,
  });
  
  // ... resto do código
}
```

### Banco de Dados em Produção

**Opções:**
1. **Turso** (SQLite na nuvem) - Recomendado
2. **PlanetScale** (MySQL)
3. **Supabase** (PostgreSQL)
4. **Railway PostgreSQL**

**Exemplo com Turso:**
```bash
# Instalar CLI
npm install -g @libsql/client

# Criar banco
turso db create ler-biblia

# Obter URL
turso db show ler-biblia

# Adicionar no Railway
DATABASE_URL=libsql://seu-banco.turso.io
DATABASE_AUTH_TOKEN=seu-token
```

## 🧪 Testar Deploy

### Frontend
```bash
# Acessar URL da Vercel
https://ler-biblia.vercel.app

# Verificar:
- ✅ Página carrega
- ✅ Navegação funciona
- ✅ Estilos aplicados
```

### Backend
```bash
# Testar API
curl https://seu-backend.railway.app/v1/bible/translations

# Deve retornar JSON com traduções
```

### Integração
```bash
# No frontend, testar:
- ✅ Carregar traduções
- ✅ Carregar livros
- ✅ Carregar capítulos
- ✅ Busca funciona
```

## 🐛 Troubleshooting

### Erro: "Failed to load module"
**Solução:**
```bash
# Limpar cache e rebuild
vercel --force
```

### Erro: "API request failed"
**Verificar:**
1. URL da API está correta
2. CORS configurado no backend
3. Backend está rodando

**Testar:**
```bash
curl https://seu-backend.railway.app/health
```

### Erro: "Build failed"
**Verificar:**
1. `package.json` tem script `build`
2. Dependências estão corretas
3. TypeScript compila sem erros

**Testar localmente:**
```bash
cd frontend
npm run build
```

### Erro: "Database not found"
**Solução:**
1. Fazer upload do `bible.db` para o backend
2. Ou usar banco de dados em nuvem
3. Ou rodar script de importação no servidor

## 📊 Monitoramento

### Vercel Analytics
```bash
# Adicionar analytics
npm install @vercel/analytics

# Em frontend/src/main.ts
import { inject } from '@vercel/analytics';
inject();
```

### Logs
```bash
# Ver logs do Vercel
vercel logs

# Ver logs do Railway
# Acessar dashboard → Deployments → Logs
```

## 💰 Custos

### Vercel (Frontend)
- **Hobby (Grátis):**
  - 100 GB bandwidth/mês
  - Domínios ilimitados
  - Deploy automático

### Railway (Backend)
- **Trial (Grátis):**
  - $5 de crédito/mês
  - 500 horas de execução
  
- **Developer ($5/mês):**
  - $5 de crédito incluído
  - Uso adicional cobrado

### Turso (Banco)
- **Starter (Grátis):**
  - 9 GB de armazenamento
  - 500 milhões de leituras/mês

## 🎯 Checklist Final

### Antes do Deploy
- [ ] Código commitado no Git
- [ ] Build local funciona
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado
- [ ] Banco de dados preparado

### Deploy Frontend
- [ ] Projeto criado na Vercel
- [ ] Build bem-sucedido
- [ ] URL funcionando
- [ ] Variáveis de ambiente configuradas

### Deploy Backend
- [ ] Projeto criado no Railway
- [ ] Build bem-sucedido
- [ ] API respondendo
- [ ] Banco de dados conectado

### Testes
- [ ] Frontend carrega
- [ ] API responde
- [ ] Integração funciona
- [ ] Navegação funciona
- [ ] Busca funciona

## 📖 Recursos

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Turso Docs:** https://docs.turso.tech
- **NestJS Deploy:** https://docs.nestjs.com/deployment

## 🎉 Conclusão

Após seguir este guia, você terá:
- ✅ Frontend na Vercel
- ✅ Backend no Railway
- ✅ Banco de dados em produção
- ✅ Deploy automático configurado

**URLs de exemplo:**
- Frontend: `https://ler-biblia.vercel.app`
- Backend: `https://ler-biblia-backend.up.railway.app`
- API: `https://ler-biblia-backend.up.railway.app/api`

