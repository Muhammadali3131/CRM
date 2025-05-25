const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      group_id,
      status_id,
      reason_id,
    } = req.body;

    const newLid = await pool.query(
      `INSERT INTO lid (first_name, last_name, phone_number, stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reason_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        first_name,
        last_name,
        phone_number,
        stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        group_id,
        status_id,
        reason_id,
      ]
    );
    res.status(201).send(newLid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLids = async (req, res) => {
  try {
    const lids = await pool.query("SELECT * FROM lid");
    res.status(200).send(lids.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getLidById = async (req, res) => {
  try {
    const { id } = req.params;
    const lid = await pool.query("SELECT * FROM lid WHERE id = $1", [id]);
    res.status(200).send(lid.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLidById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      group_id,
      status_id,
      reason_id,
    } = req.body;

    const updatedLid = await pool.query(
      `UPDATE lid
       SET first_name = $1, last_name = $2, phone_number = $3, lid_stage_id = $4, test_date = $5, trial_lesson_date = $6, trial_lesson_time = $7, group_id = $8, status_id = $9, reason_id = $10
       WHERE id = $11`,
      [
        first_name,
        last_name,
        phone_number,
        stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        group_id,
        status_id,
        reason_id,
        id,
      ]
    );
    res.status(200).send({ updatedRows: updatedLid.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteLidById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLid = await pool.query("DELETE FROM lid WHERE id = $1", [id]);
    res.status(200).send({ deletedRows: deletedLid.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLid,
  getAllLids,
  getLidById,
  updateLidById,
  deleteLidById,
};
