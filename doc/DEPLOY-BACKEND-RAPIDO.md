# 🚀 Deploy do Backend - Guia Rápido

## 🚂 Railway (Mais Fácil)

### 1. Preparar
```bash
git add .
git commit -m "Deploy backend"
git push origin main
```

### 2. Deploy
1. Acesse: **https://railway.app**
2. Login com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Escolha: `ler-biblia`
5. Configure:
   ```
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   ```
6. Adicione variáveis:
   ```
   NODE_ENV=production
   PORT=3000
   ```
7. Aguarde deploy (3-5 min)
8. **Settings** → **Domains** → **Generate Domain**
9. Copie a URL (ex: `https://xxx.up.railway.app`)

### 3. Importar Bíblia
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Importar
railway run npm run import-bible-github:prod nvi
```

### 4. Conectar ao Frontend
```bash
# Configurar no Vercel
vercel env add VITE_API_URL production
# Cole a URL do Railway

# Redeploy
vercel --prod
```

### 5. Testar
```bash
# Testar API
curl https://sua-url.railway.app/v1/bible/translations

# Acessar frontend
https://ler-biblia.vercel.app
```

---

## 🎨 Render (Alternativa Grátis)

### 1. Preparar
```bash
git add .
git commit -m "Deploy backend"
git push origin main
```

### 2. Deploy
1. Acesse: **https://render.com**
2. Login com GitHub
3. **New +** → **Web Service**
4. Conecte repositório `ler-biblia`
5. Configure:
   ```
   Name: ler-biblia-backend
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   Plan: Free
   ```
6. Adicione variáveis:
   ```
   NODE_ENV=production
   PORT=3000
   ```
7. **Create Web Service**
8. Aguarde deploy (5-10 min)
9. Copie a URL (ex: `https://xxx.onrender.com`)

### 3. Importar Bíblia
1. No dashboard do Render
2. Clique em **Shell**
3. Execute:
   ```bash
   npm run import-bible-github:prod nvi
   ```

### 4. Conectar ao Frontend
```bash
vercel env add VITE_API_URL production
# Cole a URL do Render

vercel --prod
```

---

## ⚡ Deploy Completo Automático

```bash
# Execute o script
./deploy-completo.sh

# Siga as instruções na tela
```

---

## 🐛 Problemas Comuns

### "Application failed to start"
```bash
# Ver logs
railway logs  # ou no dashboard do Render

# Verificar:
- Build foi bem-sucedido?
- PORT está configurado?
- Dependências instaladas?
```

### "Database not found"
```bash
# Importar Bíblia
railway run npm run import-bible-github:prod nvi

# Ou fazer upload
railway up bible.db
```

### "CORS error"
```bash
# Adicionar variável no Railway/Render
FRONTEND_URL=https://ler-biblia.vercel.app

# Já está configurado no código!
```

---

## 💰 Custos

**Railway:**
- $5 de crédito grátis/mês
- Suficiente para este projeto

**Render:**
- Plano Free disponível
- Pode hibernar após inatividade

---

## ✅ Checklist

- [ ] Código commitado e pushed
- [ ] Conta criada (Railway/Render)
- [ ] Projeto criado e configurado
- [ ] Deploy bem-sucedido
- [ ] URL obtida
- [ ] Bíblia importada
- [ ] Frontend conectado
- [ ] Testes passando

---

## 📖 Documentação Completa

Para mais detalhes: `doc/DEPLOY-BACKEND.md`

---

## 🎯 Resultado Esperado

Após o deploy:
- ✅ Backend rodando em produção
- ✅ API acessível publicamente
- ✅ Banco de dados com 30k+ versículos
- ✅ Frontend conectado ao backend
- ✅ Deploy automático configurado

**URLs:**
- Backend: `https://xxx.railway.app`
- API Docs: `https://xxx.railway.app/api`
- Frontend: `https://ler-biblia.vercel.app`

