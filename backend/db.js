// Database configuration for PostgreSQL connection
const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool to PostgreSQL database
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'vitalapp',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '2304',
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Error connecting to database:', err);
});

module.exports = pool;
