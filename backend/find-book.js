const { Client } = require('pg');
require('dotenv').config();

async function findBook() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'ler_biblia',
  });

  try {
    await client.connect();
    
    console.log('\n🔍 Você está tentando acessar bookId=94');
    console.log('❌ Esse ID não existe! Os livros vão de 1 a 66.\n');
    
    // Mostrar alguns livros próximos
    console.log('📚 Livros disponíveis (últimos 10):');
    const result = await client.query(
      'SELECT id, name, abbreviation, "order" FROM books WHERE id >= 57 ORDER BY id'
    );
    
    result.rows.forEach(book => {
      console.log(`   ID: ${book.id.toString().padStart(2)} | ${book.abbreviation.padEnd(5)} | ${book.name}`);
    });
    
    console.log('\n💡 Talvez você esteja procurando:');
    console.log('   - Oséias (ID 28)');
    console.log('   - Apocalipse (ID 66 - último livro)');
    
    console.log('\n✅ URL correta para Oséias 4:13:');
    console.log('   http://localhost:3000/v1/bible/verse?translationId=1&bookId=28&chapter=4&verse=13');
    
    console.log('\n📖 Para ver todos os livros:');
    console.log('   http://localhost:3000/v1/bible/books');
    console.log('   http://localhost:3000/v1/bible/info');

    await client.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

findBook();

