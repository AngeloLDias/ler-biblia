#!/bin/bash

echo "🚀 Deploy Completo - Ler Bíblia"
echo "================================"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está na raiz do projeto
if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto${NC}"
    exit 1
fi

echo "📋 Este script irá fazer deploy de:"
echo "  1. Backend no Railway"
echo "  2. Frontend na Vercel"
echo "  3. Conectar os dois"
echo ""
read -p "Continuar? (s/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Cancelado."
    exit 0
fi

# ============================================
# PARTE 1: PREPARAR CÓDIGO
# ============================================
echo ""
echo -e "${YELLOW}📦 Preparando código...${NC}"

# Commit mudanças
git add .
git commit -m "Deploy: Preparar para produção" || echo "Nada para commitar"
git push origin main || echo "Já está atualizado"

echo -e "${GREEN}✅ Código preparado${NC}"

# ============================================
# PARTE 2: DEPLOY DO BACKEND (RAILWAY)
# ============================================
echo ""
echo -e "${YELLOW}🚂 Deploy do Backend no Railway${NC}"
echo "================================"
echo ""
echo "Siga os passos:"
echo "1. Acesse: https://railway.app"
echo "2. Faça login com GitHub"
echo "3. Clique em 'New Project'"
echo "4. Selecione 'Deploy from GitHub repo'"
echo "5. Escolha o repositório 'ler-biblia'"
echo "6. Configure:"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm run start:prod"
echo "7. Adicione variáveis de ambiente:"
echo "   - NODE_ENV=production"
echo "   - PORT=3000"
echo "8. Aguarde o deploy (3-5 minutos)"
echo "9. Vá em Settings → Domains → Generate Domain"
echo "10. Copie a URL gerada"
echo ""
read -p "Cole a URL do backend aqui (ex: https://xxx.railway.app): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo -e "${RED}❌ URL do backend é obrigatória${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend URL: $BACKEND_URL${NC}"

# ============================================
# PARTE 3: IMPORTAR BÍBLIA NO BACKEND
# ============================================
echo ""
echo -e "${YELLOW}📖 Importar Bíblia no Backend${NC}"
echo "=============================="
echo ""
echo "Você precisa importar a Bíblia no servidor Railway."
echo ""
echo "Opção 1: Via Railway CLI (Recomendado)"
echo "  npm install -g @railway/cli"
echo "  railway login"
echo "  railway link"
echo "  railway run npm run import-bible-github:prod nvi"
echo ""
echo "Opção 2: Fazer upload do bible.db"
echo "  railway up bible.db"
echo ""
read -p "Já importou a Bíblia? (s/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}⚠️  Lembre-se de importar a Bíblia depois!${NC}"
fi

# ============================================
# PARTE 4: DEPLOY DO FRONTEND (VERCEL)
# ============================================
echo ""
echo -e "${YELLOW}🎨 Deploy do Frontend na Vercel${NC}"
echo "================================"
echo ""

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Login
echo "🔐 Fazendo login na Vercel..."
vercel whoami || vercel login

# Configurar variável de ambiente
echo ""
echo "📝 Configurando variável VITE_API_URL=$BACKEND_URL"
vercel env add VITE_API_URL production <<< "$BACKEND_URL" 2>/dev/null || echo "Variável já existe"

# Deploy
echo ""
echo "🚀 Fazendo deploy do frontend..."
vercel --prod

echo ""
echo -e "${GREEN}✅ Deploy do frontend concluído!${NC}"

# ============================================
# PARTE 5: TESTAR
# ============================================
echo ""
echo -e "${YELLOW}🧪 Testando deploy...${NC}"
echo "===================="
echo ""

# Testar backend
echo "Testando backend..."
if curl -s "$BACKEND_URL/v1/bible/translations" > /dev/null; then
    echo -e "${GREEN}✅ Backend respondendo${NC}"
else
    echo -e "${RED}❌ Backend não está respondendo${NC}"
    echo "   Verifique os logs no Railway"
fi

# ============================================
# RESUMO FINAL
# ============================================
echo ""
echo "================================"
echo -e "${GREEN}🎉 Deploy Completo!${NC}"
echo "================================"
echo ""
echo "📊 Resumo:"
echo "  Backend:  $BACKEND_URL"
echo "  Frontend: (veja a URL acima no output do Vercel)"
echo "  API Docs: $BACKEND_URL/api"
echo ""
echo "📖 Próximos passos:"
echo "  1. Acesse o frontend e teste"
echo "  2. Verifique se a API está respondendo"
echo "  3. Configure domínio customizado (opcional)"
echo "  4. Configure backup do banco de dados"
echo ""
echo "📚 Documentação:"
echo "  - Backend: doc/DEPLOY-BACKEND.md"
echo "  - Frontend: doc/DEPLOY-VERCEL.md"
echo "  - Rápido: DEPLOY-RAPIDO.md"
echo ""
echo -e "${GREEN}✅ Tudo pronto!${NC}"

