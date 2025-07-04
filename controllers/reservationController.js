const pool = require('../config/db');

exports.createReservation = async (req, res) => {
  const { id_client, id_chambre, date_debut, date_fin } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reservation (id_client, id_chambre, date_debut, date_fin) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_client, id_chambre, date_debut, date_fin]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur création réservation :', err);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservation ORDER BY id_reservation ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur récupération réservations :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};

exports.deleteReservation = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM reservation WHERE id_reservation = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (err) {
    console.error('Erreur suppression réservation :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la réservation' });
  }
};

exports.updateReservation = async (req, res) => {
  const id = req.params.id;
  const { id_client, id_chambre, date_debut, date_fin } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reservation SET id_client=$1, id_chambre=$2, date_debut=$3, date_fin=$4 WHERE id_reservation=$5 RETURNING *',
      [id_client, id_chambre, date_debut, date_fin, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur mise à jour réservation :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation' });
  }
};
