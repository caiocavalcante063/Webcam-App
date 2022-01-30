const connection = require('./connection');

const create = async (src) => {
  const [result] = await connection.execute(
    'INSERT INTO pictures (src) VALUES (?)',
    [src],
  );

  return {
    id: result.insertId,
  };
};

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM pictures');
  return rows;
};

const remove = async (src) => {
  await connection.execute(
    'DELETE FROM pictures WHERE src = ?',
    [src],
  );
};

module.exports = {
  create,
  getAll,
  remove,
};