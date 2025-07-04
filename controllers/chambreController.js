const pool = require('../config/db');

exports.createChambre = async (req, res) => {
  const { numero, type, prix } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO chambre (numero, type, prix) VALUES ($1, $2, $3) RETURNING *',
      [numero, type, prix]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur création chambre :', err);
    res.status(500).json({ error: 'Erreur lors de la création de la chambre' });
  }
};

exports.getAllChambres = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chambre ORDER BY id_chambre ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur récupération chambres :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des chambres' });
  }
};

exports.deleteChambre = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM chambre WHERE id_chambre = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Chambre non trouvée' });
    res.status(200).json({ message: 'Chambre supprimée' });
  } catch (err) {
    console.error('Erreur suppression chambre :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la chambre' });
  }
};

exports.updateChambre = async (req, res) => {
  const id = req.params.id;
  const { numero, type, prix } = req.body;
  try {
    const result = await pool.query(
      'UPDATE chambre SET numero=$1, type=$2, prix=$3 WHERE id_chambre=$4 RETURNING *',
      [numero, type, prix, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Chambre non trouvée' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur mise à jour chambre :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la chambre' });
  }
};
