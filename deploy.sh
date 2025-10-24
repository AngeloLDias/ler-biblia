#!/bin/bash

echo "🚀 Deploy Ler Bíblia na Vercel"
echo "================================"
echo ""

# Verificar se está na raiz do projeto
if [ ! -f "vercel.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
fi

# Fazer login (se necessário)
echo "🔐 Verificando autenticação..."
vercel whoami || vercel login

# Perguntar sobre variáveis de ambiente
echo ""
echo "⚙️  Configuração de Variáveis de Ambiente"
echo "=========================================="
read -p "URL da API do backend (ex: https://seu-backend.railway.app): " API_URL

if [ -z "$API_URL" ]; then
    echo "⚠️  Usando API local (http://localhost:3000)"
    API_URL="http://localhost:3000"
fi

# Configurar variável de ambiente
echo "📝 Configurando VITE_API_URL=$API_URL"
vercel env add VITE_API_URL production <<< "$API_URL"

# Deploy
echo ""
echo "🚀 Iniciando deploy..."
vercel --prod

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📖 Próximos passos:"
echo "1. Acesse a URL fornecida pela Vercel"
echo "2. Teste a aplicação"
echo "3. Configure domínio customizado (opcional)"
echo ""

