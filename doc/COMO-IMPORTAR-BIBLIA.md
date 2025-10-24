# 📖 Como Importar a Bíblia Completa

## Opção 1: Importar da API (Recomendado) ⭐

Esta é a forma mais fácil e rápida. Usa a API Bíblia Digital brasileira.

### Passo a Passo:

1. **Certifique-se que o seed foi executado:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Execute o script de importação:**
   ```bash
   npm run import-bible nvi
   ```

   **Traduções disponíveis:**
   - `nvi` - Nova Versão Internacional
   - `acf` - Almeida Corrigida Fiel
   - `arc` - Almeida Revista e Corrigida
   - `aa` - Almeida Atualizada

3. **Aguarde a importação:**
   - Tempo estimado: 10-20 minutos
   - Total de versículos: ~31.000
   - O script mostra o progresso em tempo real

4. **Verifique a importação:**
   ```bash
   # Acesse a API
   curl http://localhost:3000/v1/bible/chapter?translationId=1&bookId=1&chapter=1
   ```

### Exemplo de Saída:

```
📖 Iniciando importação da Bíblia da API...
✅ Tradução: Nova Versão Internacional
📚 Total de livros: 66

📖 Importando: Gênesis (50 capítulos)
  📄 Capítulo 1...
  📄 Capítulo 2...
  ...
  ✓ 1533 versículos salvos...

📖 Importando: Êxodo (40 capítulos)
  ...

✅ Importação concluída!
📊 Total de versículos importados: 31102
📖 Tradução: Nova Versão Internacional
```

## Opção 2: Baixar de Repositório GitHub

### Repositórios Recomendados:

#### 1. **thiagobodruk/bible** (Mais completo)
```bash
# Clone o repositório
git clone https://github.com/thiagobodruk/bible.git temp-bible

# Copie os arquivos JSON
cp temp-bible/json/*.json backend/src/database/seeds/data/

# Remova o repositório temporário
rm -rf temp-bible
```

#### 2. **marciovsena/abibliadigital**
```bash
git clone https://github.com/marciovsena/abibliadigital.git temp-bible
# Procure pelos arquivos JSON de versículos
```

## Opção 3: API Bíblia Digital (Manual)

Se preferir fazer manualmente ou criar seu próprio script:

### Endpoints da API:

**Base URL:** `https://www.abibliadigital.com.br/api`

**Listar versões:**
```bash
curl https://www.abibliadigital.com.br/api/versions
```

**Buscar livro completo:**
```bash
curl https://www.abibliadigital.com.br/api/books/nvi/gn
```

**Buscar capítulo:**
```bash
curl https://www.abibliadigital.com.br/api/verses/nvi/gn/1
```

**Buscar versículo específico:**
```bash
curl https://www.abibliadigital.com.br/api/verses/nvi/gn/1/1
```

### Exemplo de Resposta:

```json
{
  "book": {
    "abbrev": { "pt": "gn" },
    "name": "Gênesis",
    "author": "Moisés",
    "group": "Pentateuco",
    "version": "nvi"
  },
  "chapter": {
    "number": 1,
    "verses": 31
  },
  "verses": [
    {
      "number": 1,
      "text": "No princípio Deus criou os céus e a terra."
    },
    {
      "number": 2,
      "text": "Era a terra sem forma e vazia..."
    }
  ]
}
```

## Opção 4: Arquivo JSON Pronto

Se você tiver um arquivo JSON com a Bíblia completa:

### Formato Esperado:

```json
{
  "translation": "NVI",
  "books": [
    {
      "bookId": 1,
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            { "verse": 1, "text": "No princípio..." },
            { "verse": 2, "text": "..." }
          ]
        }
      ]
    }
  ]
}
```

### Como Importar:

1. Coloque o arquivo em `backend/src/database/seeds/data/bible-nvi.json`

2. Execute:
   ```bash
   npx ts-node src/database/seeds/import-bible.ts
   ```

## Verificação Pós-Importação

### 1. Verificar quantidade de versículos:

```bash
# No terminal do backend
sqlite3 bible.db "SELECT COUNT(*) FROM verse;"
```

**Resultado esperado:** ~31.000 versículos (Bíblia completa)

### 2. Testar na API:

```bash
# Gênesis 1
curl http://localhost:3000/v1/bible/chapter?translationId=1&bookId=1&chapter=1

# João 3
curl http://localhost:3000/v1/bible/chapter?translationId=1&bookId=43&chapter=3

# Apocalipse 22
curl http://localhost:3000/v1/bible/chapter?translationId=1&bookId=66&chapter=22
```

### 3. Testar busca:

```bash
curl "http://localhost:3000/v1/search?query=amor"
```

### 4. Testar no frontend:

1. Acesse http://localhost:5173
2. Clique em "Continuar Lendo"
3. Deve mostrar João 3 completo
4. Teste a busca por "amor", "fé", "esperança"

## Importar Múltiplas Traduções

Para ter várias traduções disponíveis:

```bash
# NVI
npm run import-bible nvi

# Almeida Corrigida Fiel
npm run import-bible acf

# Almeida Revista e Corrigida
npm run import-bible arc
```

**Nota:** Cada tradução adiciona ~31.000 versículos ao banco.

## Troubleshooting

### Erro: "Tradução não encontrada"
**Solução:** Execute `npm run seed` primeiro

### Erro: "API não responde"
**Solução:** Verifique sua conexão com a internet ou tente novamente mais tarde

### Importação muito lenta
**Solução:** Normal. A API tem rate limiting. Aguarde ou use um arquivo JSON local.

### Banco de dados muito grande
**Solução:** SQLite suporta bem. Com 3 traduções (~93k versículos), o arquivo terá ~50MB.

## Estatísticas da Bíblia

- **Total de livros:** 66 (39 AT + 27 NT)
- **Total de capítulos:** 1.189
- **Total de versículos:** ~31.102
- **Maior livro:** Salmos (150 capítulos)
- **Menor livro:** 2 João (1 capítulo, 13 versículos)

## Próximos Passos

Após importar a Bíblia:

1. ✅ Teste a leitura no frontend
2. ✅ Teste a busca
3. ✅ Implemente seletores de livro/capítulo
4. ✅ Adicione navegação entre capítulos
5. ✅ Implemente cache/offline

## Recursos Úteis

- **API Bíblia Digital:** https://www.abibliadigital.com.br/
- **Documentação da API:** https://www.abibliadigital.com.br/api
- **GitHub - Bible JSON:** https://github.com/thiagobodruk/bible
- **GitHub - Bíblia Digital:** https://github.com/marciovsena/abibliadigital

## Licença e Uso

A maioria das traduções da Bíblia em português são de domínio público ou têm licenças permissivas para uso não comercial. Verifique a licença específica de cada tradução antes de usar comercialmente.

**Traduções de domínio público:**
- Almeida Revista e Corrigida (ARC)
- Almeida Corrigida Fiel (ACF)

**Traduções com direitos autorais:**
- Nova Versão Internacional (NVI) - Sociedade Bíblica Internacional
- Nova Tradução na Linguagem de Hoje (NTLH) - Sociedade Bíblica do Brasil

Para uso pessoal e educacional, geralmente não há problemas.

