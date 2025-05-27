const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addGroupStuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const newGroupStuff = await pool.query(
      `INSERT INTO group_stuff (group_id, stuff_id)
       VALUES ($1, $2) RETURNING *`,
      [group_id, stuff_id]
    );
    res.status(201).send(newGroupStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllGroupStuff = async (req, res) => {
  try {
    const groupStuff = await pool.query("SELECT * FROM group_stuff");
    res.status(200).send(groupStuff.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const groupStuff = await pool.query(
      "SELECT * FROM group_stuff WHERE id = $1",
      [id]
    );
    res.status(200).send(groupStuff.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id, stuff_id } = req.body;
    const updatedGroupStuff = await pool.query(
      `UPDATE group_stuff
       SET group_id = $1, stuff_id = $2
       WHERE id = $3`,
      [group_id, stuff_id, id]
    );
    res.status(200).send({ updatedRows: updatedGroupStuff.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteGroupStuffById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroupStuff = await pool.query(
      "DELETE FROM group_stuff WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedGroupStuff.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addGroupStuff,
  getAllGroupStuff,
  getGroupStuffById,
  updateGroupStuffById,
  deleteGroupStuffById,
};
