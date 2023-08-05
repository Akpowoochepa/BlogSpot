
const pool = require('./SqlConfig.js');

async function getUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}


async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function createUser(name, email, hashedPassword) {
  await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
    name,
    email,
    hashedPassword,
  ]);
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
};
