#!/bin/bash

# Script para baixar a Bíblia completa em JSON
# Usa a API Bíblia Digital

echo "📖 Baixando Bíblia completa..."

# Criar diretório para dados
mkdir -p src/database/seeds/data

# URL da API
API_BASE="https://www.abibliadigital.com.br/api"

# Traduções disponíveis: nvi, acf, arc, aa
TRANSLATION="nvi"

echo "📥 Baixando tradução: $TRANSLATION"

# Criar arquivo JSON
OUTPUT_FILE="src/database/seeds/data/bible-${TRANSLATION}.json"

echo "{" > $OUTPUT_FILE
echo "  \"translation\": \"${TRANSLATION^^}\"," >> $OUTPUT_FILE
echo "  \"books\": [" >> $OUTPUT_FILE

# Lista de livros (1-66)
for BOOK_ID in {1..66}; do
  echo "  📚 Baixando livro $BOOK_ID..."
  
  # Baixar livro completo
  BOOK_DATA=$(curl -s "${API_BASE}/books/${TRANSLATION}/${BOOK_ID}")
  
  # Adicionar ao arquivo
  echo "    {" >> $OUTPUT_FILE
  echo "      \"bookId\": $BOOK_ID," >> $OUTPUT_FILE
  echo "      \"chapters\": [" >> $OUTPUT_FILE
  
  # Extrair capítulos
  CHAPTERS=$(echo $BOOK_DATA | jq -r '.chapters | length')
  
  for CHAPTER in $(seq 1 $CHAPTERS); do
    echo "      📄 Capítulo $CHAPTER..."
    
    CHAPTER_DATA=$(curl -s "${API_BASE}/verses/${TRANSLATION}/${BOOK_ID}/${CHAPTER}")
    
    echo "        {" >> $OUTPUT_FILE
    echo "          \"chapter\": $CHAPTER," >> $OUTPUT_FILE
    echo "          \"verses\": [" >> $OUTPUT_FILE
    
    # Extrair versículos
    VERSES=$(echo $CHAPTER_DATA | jq -r '.verses | length')
    
    for VERSE in $(seq 1 $VERSES); do
      VERSE_TEXT=$(echo $CHAPTER_DATA | jq -r ".verses[$((VERSE-1))].text")
      
      echo "            {" >> $OUTPUT_FILE
      echo "              \"verse\": $VERSE," >> $OUTPUT_FILE
      echo "              \"text\": \"$VERSE_TEXT\"" >> $OUTPUT_FILE
      
      if [ $VERSE -eq $VERSES ]; then
        echo "            }" >> $OUTPUT_FILE
      else
        echo "            }," >> $OUTPUT_FILE
      fi
    done
    
    echo "          ]" >> $OUTPUT_FILE
    
    if [ $CHAPTER -eq $CHAPTERS ]; then
      echo "        }" >> $OUTPUT_FILE
    else
      echo "        }," >> $OUTPUT_FILE
    fi
  done
  
  echo "      ]" >> $OUTPUT_FILE
  
  if [ $BOOK_ID -eq 66 ]; then
    echo "    }" >> $OUTPUT_FILE
  else
    echo "    }," >> $OUTPUT_FILE
  fi
done

echo "  ]" >> $OUTPUT_FILE
echo "}" >> $OUTPUT_FILE

echo "✅ Download concluído!"
echo "📁 Arquivo salvo em: $OUTPUT_FILE"
echo ""
echo "Para importar, execute:"
echo "  npm run import-bible"

