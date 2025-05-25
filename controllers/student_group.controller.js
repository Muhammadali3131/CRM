const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStudentGroup = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;

    const newStudentGroup = await pool.query(
      `INSERT INTO student_group (student_id, group_id) VALUES ($1, $2) RETURNING *`,
      [student_id, group_id]
    );
    res.status(201).send(newStudentGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudentGroups = async (req, res) => {
  try {
    const studentGroups = await pool.query("SELECT * FROM student_group");
    res.status(200).send(studentGroups.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const studentGroup = await pool.query(
      "SELECT * FROM student_group WHERE id = $1",
      [id]
    );
    res.status(200).send(studentGroup.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, group_id } = req.body;

    const updatedStudentGroup = await pool.query(
      `UPDATE student_group SET student_id = $1, group_id = $2 WHERE id = $3`,
      [student_id, group_id, id]
    );
    res.status(200).send({ updatedRows: updatedStudentGroup.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudentGroup = await pool.query(
      "DELETE FROM student_group WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedStudentGroup.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudentGroup,
  getAllStudentGroups,
  getStudentGroupById,
  updateStudentGroupById,
  deleteStudentGroupById,
};
