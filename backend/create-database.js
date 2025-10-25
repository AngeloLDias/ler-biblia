const { Client } = require('pg');
require('dotenv').config();

async function createDatabase() {
  // Conectar ao banco postgres padrão para criar o novo banco
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres', // Conecta ao banco padrão
  });

  try {
    await client.connect();
    console.log('✓ Conectado ao PostgreSQL');

    const dbName = process.env.DB_DATABASE || 'ler_biblia';
    
    // Verificar se o banco já existe
    const checkResult = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkResult.rows.length > 0) {
      console.log(`✓ Banco de dados "${dbName}" já existe`);
    } else {
      // Criar o banco de dados
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✓ Banco de dados "${dbName}" criado com sucesso!`);
    }

    await client.end();
    console.log('\n✅ Processo concluído!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

createDatabase();

