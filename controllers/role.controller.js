const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = await pool.query(
      `INSERT INTO role (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.status(201).send(newRole.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await pool.query(`SELECT * FROM role`);
    res.status(200).send(roles.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await pool.query(`SELECT * FROM role WHERE id = $1`, [id]);
    res.status(200).send(role.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await pool.query(`UPDATE role SET name = $1 WHERE id = $2`, [
      name,
      id,
    ]);
    res.status(200).send(role.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await pool.query(`DELETE FROM role WHERE id = $1`, [id]);
    res.status(200).send(role.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
