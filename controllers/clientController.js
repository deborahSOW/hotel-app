const pool = require('../config/db');

exports.createClient = async (req, res) => {
  const { nom, email, telephone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO client (nom, email, telephone) VALUES ($1, $2, $3) RETURNING *',
      [nom, email, telephone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur création client :', err);
    res.status(500).json({ error: 'Erreur lors de la création du client' });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM client ORDER BY id_client ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur récupération clients :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des clients' });
  }
};

exports.deleteClient = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM client WHERE id_client = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Client non trouvé' });
    res.status(200).json({ message: 'Client supprimé' });
  } catch (err) {
    console.error('Erreur suppression client :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression du client' });
  }
};

exports.updateClient = async (req, res) => {
  const id = req.params.id;
  const { nom, email, telephone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE client SET nom=$1, email=$2, telephone=$3 WHERE id_client=$4 RETURNING *',
      [nom, email, telephone, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Client non trouvé' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur mise à jour client :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du client' });
  }
};
