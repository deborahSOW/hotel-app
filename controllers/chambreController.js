const pool = require('../config/db');

// ➤ Ajouter une chambre
exports.createChambre = async (req, res) => {
  const { numero_chambre, type_chambre, prix_journalier, statut_chambre } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO chambre (numero_chambre, type_chambre, prix_journalier, statut_chambre)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [numero_chambre, type_chambre, prix_journalier, statut_chambre || 'disponible']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur ajout chambre :', err);
    res.status(500).json({ error: 'Erreur lors de l’ajout de la chambre' });
  }
};

// ➤ Lister toutes les chambres
exports.getAllChambres = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chambre ORDER BY id_chambre ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur lecture chambres :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des chambres' });
  }
};

// ➤ Modifier une chambre
exports.updateChambre = async (req, res) => {
  const id = req.params.id;
  const { numero_chambre, type_chambre, prix_journalier, statut_chambre } = req.body;
  try {
    const result = await pool.query(
      `UPDATE chambre
       SET numero_chambre = $1, type_chambre = $2, prix_journalier = $3, statut_chambre = $4
       WHERE id_chambre = $5 RETURNING *`,
      [numero_chambre, type_chambre, prix_journalier, statut_chambre, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur modification chambre :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la chambre' });
  }
};

// ➤ Supprimer une chambre
exports.deleteChambre = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM chambre WHERE id_chambre = $1', [id]);
    res.status(200).json({ message: 'Chambre supprimée' });
  } catch (err) {
    console.error('Erreur suppression chambre :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la chambre' });
  }
};
