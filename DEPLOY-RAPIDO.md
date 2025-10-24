# 🚀 Deploy Rápido na Vercel

## Opção 1: Via Dashboard (Mais Fácil)

### 1. Preparar
```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### 2. Deploy
1. Acesse: https://vercel.com/new
2. Importe seu repositório
3. Configure:
   - **Framework:** Vite
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
4. Adicione variável de ambiente:
   - **Name:** `VITE_API_URL`
   - **Value:** `http://localhost:3000` (ou URL do seu backend)
5. Clique em **Deploy**

### 3. Pronto!
Acesse a URL gerada (ex: `ler-biblia.vercel.app`)

---

## Opção 2: Via CLI (Mais Rápido)

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
# Na raiz do projeto
./deploy.sh
```

Ou manualmente:
```bash
vercel login
vercel --prod
```

### 3. Configurar API
```bash
vercel env add VITE_API_URL production
# Digite a URL do backend quando solicitado
```

---

## ⚠️ Importante

### Backend
O backend (NestJS) **NÃO** roda na Vercel. Você precisa hospedá-lo separadamente:

**Opções recomendadas:**
1. **Railway** (https://railway.app) - Mais fácil
2. **Render** (https://render.com) - Grátis
3. **Heroku** (https://heroku.com) - Tradicional

### Banco de Dados
O arquivo `bible.db` precisa estar no servidor do backend.

**Opções:**
1. Fazer upload manual do arquivo
2. Rodar script de importação no servidor
3. Usar banco de dados em nuvem (Turso, Supabase)

---

## 🧪 Testar

Após o deploy, teste:
```bash
# Acessar frontend
https://seu-app.vercel.app

# Verificar se carrega
# Verificar se navegação funciona
# Verificar se API responde (se backend estiver configurado)
```

---

## 📖 Documentação Completa

Para instruções detalhadas, veja: `doc/DEPLOY-VERCEL.md`

---

## 🆘 Problemas Comuns

### "Build failed"
```bash
# Testar build local
cd frontend
npm run build
```

### "API not responding"
- Verifique se a variável `VITE_API_URL` está configurada
- Verifique se o backend está rodando
- Verifique CORS no backend

### "Module not found"
```bash
# Limpar e rebuild
vercel --force
```

---

## ✅ Checklist

- [ ] Código commitado no Git
- [ ] Build local funciona (`cd frontend && npm run build`)
- [ ] Conta na Vercel criada
- [ ] Repositório importado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy bem-sucedido
- [ ] Site acessível

---

## 🎯 Resultado Esperado

Após o deploy, você terá:
- ✅ Frontend hospedado na Vercel
- ✅ URL pública (ex: `ler-biblia.vercel.app`)
- ✅ Deploy automático a cada push
- ✅ HTTPS gratuito
- ✅ CDN global

**Nota:** Para funcionalidade completa, você precisará hospedar o backend separadamente.

