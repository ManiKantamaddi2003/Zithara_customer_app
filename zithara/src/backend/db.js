const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zithara',
    password: '1234', // Replace 'your_password' with your actual password
    port: 5432,
});

module.exports = pool;
