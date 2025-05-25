const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addStudentLesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const newStudentLesson = await pool.query(
      `INSERT INTO student_lesson (lesson_id, student_id, is_there, reason, be_paid)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [lesson_id, student_id, is_there, reason, be_paid]
    );
    res.status(201).send(newStudentLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStudentLessons = async (req, res) => {
  try {
    const studentLessons = await pool.query("SELECT * FROM student_lesson");
    res.status(200).send(studentLessons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const studentLesson = await pool.query(
      "SELECT * FROM student_lesson WHERE id = $1",
      [id]
    );
    res.status(200).send(studentLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const updatedStudentLesson = await pool.query(
      `UPDATE student_lesson
       SET lesson_id = $1, student_id = $2, is_there = $3, reason = $4, be_paid = $5
       WHERE id = $6`,
      [lesson_id, student_id, is_there, reason, be_paid, id]
    );
    res.status(200).send({ updatedRows: updatedStudentLesson.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStudentLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudentLesson = await pool.query(
      "DELETE FROM student_lesson WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedStudentLesson.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStudentLesson,
  getAllStudentLessons,
  getStudentLessonById,
  updateStudentLessonById,
  deleteStudentLessonById,
};
