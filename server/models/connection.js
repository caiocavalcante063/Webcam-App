// arquivo responsável por fazer a conexão com o banco de dados

require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'imagesDB',
});

module.exports = connection;