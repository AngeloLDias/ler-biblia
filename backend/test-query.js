const { Client } = require('pg');
require('dotenv').config();

async function testQuery() {
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

    // Testar a query exata que a API faz
    const result = await client.query(
      'SELECT * FROM verses WHERE "translationId" = $1 AND "bookId" = $2 AND chapter = $3 ORDER BY verse',
      [1, 5, 18]
    );

    console.log(`📖 Deuteronômio 18 (translationId=1, bookId=5, chapter=18)`);
    console.log(`📊 Total de versículos: ${result.rows.length}\n`);

    if (result.rows.length > 0) {
      console.log('Primeiros 3 versículos:');
      result.rows.slice(0, 3).forEach(v => {
        console.log(`  ${v.verse}. ${v.text.substring(0, 80)}...`);
      });
    } else {
      console.log('❌ Nenhum versículo encontrado!');
      
      // Verificar se há versículos de Deuteronômio
      const dt = await client.query(
        'SELECT COUNT(*) as count FROM verses WHERE "bookId" = 5'
      );
      console.log(`\nTotal de versículos de Deuteronômio (bookId=5): ${dt.rows[0].count}`);
      
      // Verificar quais capítulos existem
      const chapters = await client.query(
        'SELECT DISTINCT chapter FROM verses WHERE "bookId" = 5 ORDER BY chapter LIMIT 10'
      );
      console.log(`Primeiros capítulos: ${chapters.rows.map(r => r.chapter).join(', ')}`);
    }

    await client.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

testQuery();

