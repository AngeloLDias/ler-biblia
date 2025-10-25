# 📋 IDs Corretos - PostgreSQL

## ⚠️ Importante

Após a migração do SQLite para PostgreSQL, os IDs mudaram!

### IDs Antigos (SQLite) ❌
- Gênesis: 67
- João: 109
- Romanos: 88
- Filipenses: 94
- translationId: 3

### IDs Novos (PostgreSQL) ✅
- Gênesis: 1
- João: 43
- Romanos: 45
- Filipenses: 50
- translationId: 1 (NVI)

## 📚 Traduções

| ID | Código | Nome | Status |
|----|--------|------|--------|
| 1 | NVI | Nova Versão Internacional | ✅ 31.105 versículos |
| 2 | ARC | Almeida Revista e Corrigida | ❌ Não importada |

## 📖 Livros (1-66)

### Antigo Testamento (1-39)

| ID | Nome | Abreviação | Capítulos |
|----|------|------------|-----------|
| 1 | Gênesis | Gn | 50 |
| 2 | Êxodo | Êx | 40 |
| 3 | Levítico | Lv | 27 |
| 4 | Números | Nm | 36 |
| 5 | Deuteronômio | Dt | 34 |
| 6 | Josué | Js | 24 |
| 7 | Juízes | Jz | 21 |
| 8 | Rute | Rt | 4 |
| 9 | 1 Samuel | 1Sm | 31 |
| 10 | 2 Samuel | 2Sm | 24 |
| 11 | 1 Reis | 1Rs | 22 |
| 12 | 2 Reis | 2Rs | 25 |
| 13 | 1 Crônicas | 1Cr | 29 |
| 14 | 2 Crônicas | 2Cr | 36 |
| 15 | Esdras | Ed | 10 |
| 16 | Neemias | Ne | 13 |
| 17 | Ester | Et | 10 |
| 18 | Jó | Jó | 42 |
| 19 | Salmos | Sl | 150 |
| 20 | Provérbios | Pv | 31 |
| 21 | Eclesiastes | Ec | 12 |
| 22 | Cânticos | Ct | 8 |
| 23 | Isaías | Is | 66 |
| 24 | Jeremias | Jr | 52 |
| 25 | Lamentações | Lm | 5 |
| 26 | Ezequiel | Ez | 48 |
| 27 | Daniel | Dn | 12 |
| 28 | Oséias | Os | 14 |
| 29 | Joel | Jl | 3 |
| 30 | Amós | Am | 9 |
| 31 | Obadias | Ob | 1 |
| 32 | Jonas | Jn | 4 |
| 33 | Miquéias | Mq | 7 |
| 34 | Naum | Na | 3 |
| 35 | Habacuque | Hc | 3 |
| 36 | Sofonias | Sf | 3 |
| 37 | Ageu | Ag | 2 |
| 38 | Zacarias | Zc | 14 |
| 39 | Malaquias | Ml | 4 |

### Novo Testamento (40-66)

| ID | Nome | Abreviação | Capítulos |
|----|------|------------|-----------|
| 40 | Mateus | Mt | 28 |
| 41 | Marcos | Mc | 16 |
| 42 | Lucas | Lc | 24 |
| 43 | João | Jo | 21 |
| 44 | Atos | At | 28 |
| 45 | Romanos | Rm | 16 |
| 46 | 1 Coríntios | 1Co | 16 |
| 47 | 2 Coríntios | 2Co | 13 |
| 48 | Gálatas | Gl | 6 |
| 49 | Efésios | Ef | 6 |
| 50 | Filipenses | Fp | 4 |
| 51 | Colossenses | Cl | 4 |
| 52 | 1 Tessalonicenses | 1Ts | 5 |
| 53 | 2 Tessalonicenses | 2Ts | 3 |
| 54 | 1 Timóteo | 1Tm | 6 |
| 55 | 2 Timóteo | 2Tm | 4 |
| 56 | Tito | Tt | 3 |
| 57 | Filemom | Fm | 1 |
| 58 | Hebreus | Hb | 13 |
| 59 | Tiago | Tg | 5 |
| 60 | 1 Pedro | 1Pe | 5 |
| 61 | 2 Pedro | 2Pe | 3 |
| 62 | 1 João | 1Jo | 5 |
| 63 | 2 João | 2Jo | 1 |
| 64 | 3 João | 3Jo | 1 |
| 65 | Judas | Jd | 1 |
| 66 | Apocalipse | Ap | 22 |

## 🔄 Mapeamento de IDs Antigos → Novos

### Versículos Populares

| Referência | ID Antigo | ID Novo |
|------------|-----------|---------|
| João 3:16 | bookId: 109 | bookId: 43 |
| Romanos 8:28 | bookId: 88 | bookId: 45 |
| Filipenses 4:13 | bookId: 94 | bookId: 50 |
| Gênesis 1:1 | bookId: 67 | bookId: 1 |
| Romanos 12:2 | bookId: 88 | bookId: 45 |
| 1 Coríntios 13:4 | bookId: 90 | bookId: 46 |
| 1 João 1:9 | bookId: 107 | bookId: 62 |
| Mateus 5:8 | bookId: 86 | bookId: 40 |

### Traduções

| Nome | ID Antigo | ID Novo |
|------|-----------|---------|
| NVI | 3 | 1 |
| ARC | - | 2 |

## 📝 Exemplos de URLs

### ❌ URLs Antigas (NÃO FUNCIONAM)
```
http://localhost:3000/v1/bible/verse?translationId=3&bookId=109&chapter=3&verse=16
http://localhost:3000/v1/bible/verse?translationId=3&bookId=94&chapter=4&verse=13
http://localhost:3000/v1/bible/chapter?translationId=3&bookId=67&chapter=1
```

### ✅ URLs Corretas (FUNCIONAM)
```
http://localhost:3000/v1/bible/verse?translationId=1&bookId=43&chapter=3&verse=16
http://localhost:3000/v1/bible/verse?translationId=1&bookId=50&chapter=4&verse=13
http://localhost:3000/v1/bible/chapter?translationId=1&bookId=1&chapter=1
```

## 🛠️ Endpoints Úteis

### Ver todos os IDs disponíveis
```
GET http://localhost:3000/v1/bible/info
```

### Listar traduções
```
GET http://localhost:3000/v1/bible/translations
```

### Listar livros
```
GET http://localhost:3000/v1/bible/books
```

## ✅ Arquivos Corrigidos

- ✅ `frontend/src/pages/HomePage.vue` - IDs dos versículos populares
- ✅ `backend/src/features/bible/bible.controller.ts` - Endpoint `/info` adicionado
- ✅ `backend/src/database/seeds/import-from-github.ts` - Mapeamento dinâmico de IDs

## 🎯 Próximos Passos

1. Verificar outros arquivos do frontend que possam ter IDs hardcoded
2. Atualizar testes se houver
3. Atualizar documentação da API
4. Importar tradução ARC quando disponível

