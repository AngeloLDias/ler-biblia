const { Client } = require('pg');
require('dotenv').config();

async function checkBooks() {
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

    // Listar todos os livros
    const result = await client.query('SELECT id, name, abbreviation, "order" FROM books ORDER BY "order"');
    
    console.log('📚 Livros no banco de dados:\n');
    result.rows.forEach(book => {
      console.log(`ID: ${book.id.toString().padStart(3)} | Order: ${book.order.toString().padStart(2)} | ${book.abbreviation.padEnd(5)} | ${book.name}`);
    });

    console.log(`\n✅ Total: ${result.rows.length} livros`);

    // Verificar Deuteronômio especificamente
    const dt = result.rows.find(b => b.order === 5);
    if (dt) {
      console.log(`\n📖 Deuteronômio (5º livro):`);
      console.log(`   ID: ${dt.id}`);
      console.log(`   Abreviação: ${dt.abbreviation}`);
      
      // Verificar se tem versículos
      const verses = await client.query(
        'SELECT COUNT(*) as count FROM verses WHERE "bookId" = $1',
        [dt.id]
      );
      console.log(`   Versículos: ${verses.rows[0].count}`);
    }

    await client.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

checkBooks();

