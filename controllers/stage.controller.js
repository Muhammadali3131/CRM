const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStage = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStage = await pool.query(
      `
      INSERT INTO stage (name, description)
      values ($1, $2) RETURNING *
      `,
      [name, description]
    );
    res.status(201).send(newStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStages = async (req, res) => {
  try {
    const stages = await pool.query(`SELECT * FROM stage`);
    res.status(200).send(stages.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStageById = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await pool.query(`SELECT * FROM stage WHERE id = $1`, [id]);
    res.status(200).send(stage.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const stage = await pool.query(
      `UPDATE stage set name = $1, description = $2 WHERE id = $3`,
      [name, description, id]
    );
    res.status(200).send(stage.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStageById = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await pool.query(`DELETE FROM stage WHERE id = $1`, [id]);
    res.status(200).send(stage.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStage,
  getAllStages,
  getStageById,
  updateStageById,
  deleteStageById,
};
