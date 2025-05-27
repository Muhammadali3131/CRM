const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStuffRole = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;
    const newStuffRole = await pool.query(
      `INSERT INTO stuff_role (stuff_id, role_id)
       VALUES ($1, $2) RETURNING *`,
      [stuff_id, role_id]
    );
    res.status(201).send(newStuffRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStuffRoles = async (req, res) => {
  try {
    const stuffRoles = await pool.query("SELECT * FROM stuff_role");
    res.status(200).send(stuffRoles.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const stuffRole = await pool.query(
      "SELECT * FROM stuff_role WHERE id = $1",
      [id]
    );
    res.status(200).send(stuffRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { stuff_id, role_id } = req.body;
    const updatedStuffRole = await pool.query(
      `UPDATE stuff_role
       SET stuff_id = $1, role_id = $2
       WHERE id = $3`,
      [stuff_id, role_id, id]
    );
    res.status(200).send({ updatedRows: updatedStuffRole.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStuffRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStuffRole = await pool.query(
      "DELETE FROM stuff_role WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedStuffRole.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStuffRole,
  getAllStuffRoles,
  getStuffRoleById,
  updateStuffRoleById,
  deleteStuffRoleById,
};
