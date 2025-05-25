const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStudent = async (req, res) => {
  try {
    const { lid_id, first_name, last_name, phone_number, birthday, male } =
      req.body;

    const newStudent = await pool.query(
      `INSERT INTO students (lid_id, first_name, last_name, phone_number, birthday, male)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [lid_id, first_name, last_name, phone_number, birthday, male]
    );
    res.status(201).send(newStudent.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");
    res.status(200).send(students.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    res.status(200).send(student.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lid_id, first_name, last_name, phone_number, birthday, male } =
      req.body;

    const updatedStudent = await pool.query(
      `UPDATE students
       SET lid_id = $1, first_name = $2, last_name = $3, phone_number = $4, birthday = $5, male = $6
       WHERE id = $7`,
      [lid_id, first_name, last_name, phone_number, birthday, male, id]
    );
    res.status(200).send({ updatedRows: updatedStudent.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await pool.query(
      "DELETE FROM students WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedStudent.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
