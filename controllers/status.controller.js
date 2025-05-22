const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const newStatus = await pool.query(
      `INSERT INTO status (status) VALUES ($1) RETURNING *`,
      [status]
    );
    res.status(201).send(newStatus.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await pool.query(`SELECT * FROM status`);
    res.status(200).send(statuses.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await pool.query(`SELECT * FROM status WHERE id = $1`, [id]);
    res.status(200).send(status.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await pool.query(
      `UPDATE status SET status = $1 WHERE id = $2`,
      [status, id]
    );
    res.status(200).send(updated.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await pool.query(`DELETE FROM status WHERE id = $1`, [id]);
    res.status(200).send(status.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatuses,
  getStatusById,
  updateStatusById,
  deleteStatusById,
};
