import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const client = createClient(process.env.POSTGRES_URL);

  try {
    await client.connect();

    // Create a table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE
      )
    `);

    // Insert a record
    await client.query(`
      INSERT INTO users (name, email)
      VALUES ('John Doe', 'john@example.com')
    `);

    // Query the database
    const result = await client.query('SELECT * FROM users');
    console.log(result.rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

main();
