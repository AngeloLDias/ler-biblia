# 🚀 Deploy AGORA - Escolha uma Opção

## ✅ Código já está no GitHub!
- Repositório: https://github.com/AngeloLDias/ler-biblia

---

## 🎯 Opção 1: Railway (SEM cartão necessário) ⭐

### Passo 1: Acessar Railway
```
https://railway.app
```

### Passo 2: Login
- Clique em "Login"
- Escolha "Login with GitHub"
- Autorize o Railway

### Passo 3: Criar Projeto
- Clique em "New Project"
- Selecione "Deploy from GitHub repo"
- Escolha: **AngeloLDias/ler-biblia**

### Passo 4: Configurar
Railway vai detectar automaticamente o `railway.json`, mas confirme:

```
Root Directory: backend
Build Command: npm install && npm run build
Start Command: npm run start:prod
```

### Passo 5: Variáveis de Ambiente
Adicione (se não foram detectadas):
```
NODE_ENV=production
PORT=3000
```

### Passo 6: Deploy
- Railway fará o deploy automaticamente
- Aguarde 3-5 minutos
- Vá em "Settings" → "Domains" → "Generate Domain"
- Copie a URL (ex: `https://ler-biblia-backend.up.railway.app`)

### Passo 7: Importar Bíblia
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Importar Bíblia
railway run npm run import-bible-github:prod nvi
```

---

## 🎯 Opção 2: Render (Requer cartão, mas plano free)

### Passo 1: Adicionar Cartão
A janela já está aberta em: https://dashboard.render.com/billing

- Adicione um cartão de crédito
- Pode usar o plano FREE (não será cobrado)

### Passo 2: Depois de adicionar o cartão
Me avise que eu crio o serviço automaticamente via MCP!

---

## 🎯 Opção 3: Vercel (Apenas Frontend)

Se quiser fazer deploy apenas do frontend por enquanto:

```bash
# Deploy do frontend
vercel --prod

# Backend continua rodando localmente
# Configure VITE_API_URL=http://localhost:3000
```

---

## 💡 Recomendação

**Use Railway (Opção 1)** - É mais fácil e não precisa de cartão!

1. Acesse: https://railway.app
2. Login com GitHub
3. New Project → Deploy from GitHub repo
4. Escolha: ler-biblia
5. Aguarde deploy
6. Copie a URL

---

## 🆘 Precisa de Ajuda?

**Railway:**
- Documentação: https://docs.railway.app
- Suporte: https://railway.app/help

**Render:**
- Documentação: https://render.com/docs
- Suporte: https://render.com/support

---

## ✅ Próximos Passos Após Deploy

### 1. Obter URL do Backend
```
Railway: https://xxx.up.railway.app
Render: https://xxx.onrender.com
```

### 2. Importar Bíblia
```bash
# Railway
railway run npm run import-bible-github:prod nvi

# Render (via Shell no dashboard)
npm run import-bible-github:prod nvi
```

### 3. Conectar Frontend
```bash
vercel env add VITE_API_URL production
# Cole a URL do backend

vercel --prod
```

### 4. Testar
```bash
# Backend
curl https://sua-url/v1/bible/translations

# Frontend
https://ler-biblia.vercel.app
```

---

## 🎉 Resultado Final

Após completar, você terá:
- ✅ Backend em produção (Railway/Render)
- ✅ Frontend na Vercel
- ✅ Banco de dados com 30k+ versículos
- ✅ API pública funcionando
- ✅ Deploy automático configurado

**URLs:**
- Frontend: `https://ler-biblia.vercel.app`
- Backend: `https://xxx.railway.app` ou `https://xxx.onrender.com`
- API Docs: `https://xxx.railway.app/api`

