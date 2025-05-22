const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addReason = async (req, res) => {
  try {
    const { reason_id } = req.body;
    const newReason = await pool.query(
      `INSERT INTO reason (reason_id) VALUES ($1) RETURNING *`,
      [reason_id]
    );
    res.status(201).send(newReason.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllReasons = async (req, res) => {
  try {
    const reasons = await pool.query(`SELECT * FROM reason`);
    res.status(200).send(reasons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getReasonById = async (req, res) => {
  try {
    const { id } = req.params;
    const reason = await pool.query(`SELECT * FROM reason WHERE id = $1`, [id]);
    res.status(200).send(reason.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateReasonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_id } = req.body;

    const updated = await pool.query(
      `UPDATE reason SET reason_id = $1 WHERE id = $2`,
      [reason_id, id]
    );
    res.status(200).send(updated.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteReasonById = async (req, res) => {
  try {
    const { id } = req.params;
    const reason = await pool.query(`DELETE FROM reason WHERE id = $1`, [id]);
    res.status(200).send(reason.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addReason,
  getAllReasons,
  getReasonById,
  updateReasonById,
  deleteReasonById,
};
