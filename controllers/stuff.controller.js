// Stuff Controller
const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStuff = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const newStuff = await pool.query(
      `INSERT INTO Stuff (first_name, last_name, phone_number, login, parol, is_active)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, phone_number, login, parol, is_active]
    );
    res.status(201).send(newStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStuff = async (req, res) => {
  try {
    const stuff = await pool.query("SELECT * FROM Stuff");
    res.status(200).send(stuff.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const stuff = await pool.query("SELECT * FROM Stuff WHERE id = $1", [id]);
    res.status(200).send(stuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const updatedStuff = await pool.query(
      `UPDATE Stuff
       SET first_name = $1, last_name = $2, phone_number = $3, login = $4, parol = $5, is_active = $6
       WHERE id = $7`,
      [first_name, last_name, phone_number, login, parol, is_active, id]
    );
    res.status(200).send({ updatedRows: updatedStuff.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStuff = await pool.query("DELETE FROM Stuff WHERE id = $1", [
      id,
    ]);
    res.status(200).send({ deletedRows: deletedStuff.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStuff,
  getAllStuff,
  getStuffById,
  updateStuffById,
  deleteStuffById,
};
