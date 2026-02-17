const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Man089@#', // Change this to your MySQL root password
  database: 'students',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

const promisePool = pool.promise();

// Test connection
promisePool.query('SELECT 1')
  .then(() => console.log('MySQL connected successfully'))
  .catch(err => console.error('MySQL connection error:', err.message));

module.exports = promisePool;
