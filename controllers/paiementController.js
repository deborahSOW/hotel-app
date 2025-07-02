const pool = require('../config/db');

// ➤ Créer un paiement
exports.createPaiement = async (req, res) => {
  const { id_reservation, montant, mode_paiement, date_paiement } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO paiement (id_reservation, montant, mode_paiement, date_paiement)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_reservation, montant, mode_paiement, date_paiement]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur création paiement :', err);
    res.status(500).json({ error: 'Erreur lors de la création du paiement' });
  }
};

// ➤ Lister tous les paiements
exports.getAllPaiements = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, r.id_client, r.id_chambre
       FROM paiement p
       JOIN reservation r ON p.id_reservation = r.id_reservation
       ORDER BY p.id_paiement ASC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur récupération paiements :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements' });
  }
};

// ➤ Modifier un paiement
exports.updatePaiement = async (req, res) => {
  const id = req.params.id;
  const { id_reservation, montant, mode_paiement, date_paiement } = req.body;
  try {
    const result = await pool.query(
      `UPDATE paiement
       SET id_reservation = $1, montant = $2, mode_paiement = $3, date_paiement = $4
       WHERE id_paiement = $5 RETURNING *`,
      [id_reservation, montant, mode_paiement, date_paiement, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur mise à jour paiement :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du paiement' });
  }
};

// ➤ Supprimer un paiement
exports.deletePaiement = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM paiement WHERE id_paiement = $1', [id]);
    res.status(200).json({ message: 'Paiement supprimé' });
  } catch (err) {
    console.error('Erreur suppression paiement :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression du paiement' });
  }
};
