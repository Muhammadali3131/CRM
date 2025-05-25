const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const newLesson = await pool.query(
      `INSERT INTO lesson (lesson_theme, lesson_number, group_id, lesson_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [lesson_theme, lesson_number, group_id, lesson_date]
    );
    res.status(201).send(newLesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllLessons = async (req, res) => {
  try {
    const lessons = await pool.query("SELECT * FROM lesson");
    res.status(200).send(lessons.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await pool.query("SELECT * FROM lesson WHERE id = $1", [id]);
    res.status(200).send(lesson.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const updatedLesson = await pool.query(
      `UPDATE lesson
       SET lesson_theme = $1, lesson_number = $2, group_id = $3, lesson_date = $4
       WHERE id = $5`,
      [lesson_theme, lesson_number, group_id, lesson_date, id]
    );
    res.status(200).send({ updatedRows: updatedLesson.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLesson = await pool.query("DELETE FROM lesson WHERE id = $1", [
      id,
    ]);
    res.status(200).send({ deletedRows: deletedLesson.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addLesson,
  getAllLessons,
  getLessonById,
  updateLessonById,
  deleteLessonById,
};
