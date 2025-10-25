const { Client } = require('pg');
require('dotenv').config();

async function checkTranslation() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'ler_biblia',
  });

  try {
    await client.connect();
    console.log('✓ Conectado ao PostgreSQL\n');

    // Listar traduções
    const translations = await client.query('SELECT * FROM translations ORDER BY id');
    console.log('📚 Traduções disponíveis:');
    translations.rows.forEach(t => {
      console.log(`  ID: ${t.id} | Código: ${t.code} | Nome: ${t.name}`);
    });

    // Verificar bookId 94
    const book94 = await client.query('SELECT * FROM books WHERE id = 94');
    if (book94.rows.length > 0) {
      console.log(`\n📖 Livro ID 94: ${book94.rows[0].name} (${book94.rows[0].abbreviation})`);
    } else {
      console.log('\n❌ Livro ID 94 não existe!');
      
      // Verificar qual é o livro de ordem 28 (Oséias)
      const hosea = await client.query('SELECT * FROM books WHERE "order" = 28');
      if (hosea.rows.length > 0) {
        console.log(`📖 Oséias (ordem 28): ID ${hosea.rows[0].id}, Abreviação: ${hosea.rows[0].abbreviation}`);
      }
    }

    // Testar a query específica
    console.log('\n🔍 Testando query: translationId=3, bookId=94, chapter=4, verse=13');
    const result = await client.query(
      'SELECT * FROM verses WHERE "translationId" = $1 AND "bookId" = $2 AND chapter = $3 AND verse = $4',
      [3, 94, 4, 13]
    );
    
    if (result.rows.length > 0) {
      console.log('✅ Versículo encontrado:', result.rows[0].text);
    } else {
      console.log('❌ Versículo não encontrado!');
      
      // Verificar se existe translationId=1 para esse livro
      const alt = await client.query(
        'SELECT * FROM verses WHERE "translationId" = 1 AND "bookId" = 28 AND chapter = 4 AND verse = 13'
      );
      if (alt.rows.length > 0) {
        console.log('\n💡 Sugestão: Use translationId=1, bookId=28');
        console.log('   Texto:', alt.rows[0].text.substring(0, 100) + '...');
      }
    }

    await client.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

checkTranslation();

