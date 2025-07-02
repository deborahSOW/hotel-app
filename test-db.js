const db = require('./db');

(async () => {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Connexion réussie. Heure actuelle :', res.rows[0]);
  } catch (err) {
    console.error('Échec de la connexion à la base de données :', err);
  }
})();