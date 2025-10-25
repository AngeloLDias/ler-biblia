const { Client } = require('pg');
require('dotenv').config();

async function clearVerses() {
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

    // Contar versículos antes
    const before = await client.query('SELECT COUNT(*) as count FROM verses');
    console.log(`📊 Versículos antes: ${before.rows[0].count}`);

    // Limpar versículos
    await client.query('TRUNCATE TABLE verses RESTART IDENTITY CASCADE');
    console.log('✓ Versículos removidos');

    // Contar versículos depois
    const after = await client.query('SELECT COUNT(*) as count FROM verses');
    console.log(`📊 Versículos depois: ${after.rows[0].count}`);

    console.log('\n✅ Banco limpo! Agora execute: npm run import-bible-github nvi');

    await client.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

clearVerses();

