const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addBranch = async (req, res) => {
  try {
    const { name, address, phone_number } = req.body;
    const newBranch = await pool.query(
      `INSERT INTO branch (name, address, phone_number) VALUES ($1, $2, $3) RETURNING *`,
      [name, address, phone_number]
    );
    res.status(201).send(newBranch.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllBranches = async (req, res) => {
  try {
    const branches = await pool.query(`SELECT * FROM branch`);
    res.status(200).send(branches.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await pool.query(`SELECT * FROM branch WHERE id = $1`, [id]);
    res.status(200).send(branch.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, call_number } = req.body;

    const branch = await pool.query(
      `UPDATE branch SET name = $1, address = $2, call_number = $3 WHERE id = $4`,
      [name, address, call_number, id]
    );
    res.status(200).send(branch.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await pool.query(`DELETE FROM branch WHERE id = $1`, [id]);
    res.status(200).send(branch.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBranch,
  getAllBranches,
  getBranchById,
  updateBranchById,
  deleteBranchById,
};
