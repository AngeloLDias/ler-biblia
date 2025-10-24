#!/bin/bash

echo "🚀 Setup GitHub e Deploy"
echo "========================"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Passo 1: Criar Repositório no GitHub${NC}"
echo "=========================================="
echo ""
echo "Acesse: https://github.com/new"
echo ""
echo "Configure:"
echo "  Repository name: ler-biblia"
echo "  Description: Aplicativo de leitura da Bíblia"
echo "  Public: ✓"
echo "  ❌ NÃO marque 'Initialize this repository with a README'"
echo ""
read -p "Pressione ENTER depois de criar o repositório..."

echo ""
echo -e "${YELLOW}📋 Passo 2: Conectar ao Repositório${NC}"
echo "====================================="
echo ""
read -p "Cole a URL do repositório (ex: https://github.com/AngeloLDias/ler-biblia.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo -e "${RED}❌ URL do repositório é obrigatória${NC}"
    exit 1
fi

# Adicionar remote
echo "Adicionando remote..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

# Renomear branch para main
echo "Renomeando branch para main..."
git branch -M main

# Push
echo "Fazendo push..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Código enviado para o GitHub!${NC}"
else
    echo -e "${RED}❌ Erro ao fazer push${NC}"
    echo "Tente manualmente:"
    echo "  git remote add origin $REPO_URL"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Repositório configurado!${NC}"
echo ""
echo "URL do repositório: $REPO_URL"
echo ""
echo -e "${YELLOW}📋 Próximo Passo: Deploy no Render${NC}"
echo "===================================="
echo ""
echo "Agora vou criar o web service no Render..."
echo ""

# Extrair username e repo name da URL
REPO_NAME=$(echo "$REPO_URL" | sed -E 's/.*github\.com[:/](.*)\.git/\1/')

echo "Repositório: $REPO_NAME"
echo ""
echo "Acesse: https://render.com"
echo "1. Login com GitHub"
echo "2. New + → Web Service"
echo "3. Connect repository: $REPO_NAME"
echo "4. Configure:"
echo "   Name: ler-biblia-backend"
echo "   Root Directory: backend"
echo "   Build Command: npm install && npm run build"
echo "   Start Command: npm run start:prod"
echo "   Environment Variables:"
echo "     NODE_ENV=production"
echo "     PORT=3000"
echo "5. Create Web Service"
echo ""
echo -e "${GREEN}✅ Pronto!${NC}"

