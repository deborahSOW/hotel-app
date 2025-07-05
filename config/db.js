require('dotenv').config();
console.log("🔍 DB_HOST=", process.env.DB_HOST);

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false // important pour Render
  }
});

pool.connect()
  .then(() => console.log("✅ Connexion à PostgreSQL réussie"))
  .catch((err) => console.error("❌ Échec connexion PostgreSQL :", err));

module.exports = pool;
