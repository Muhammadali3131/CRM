const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addPayment = async (req, res) => {
  try {
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attend,
    } = req.body;

    const newPayment = await pool.query(
      `INSERT INTO payment (student_id, payment_last_date, payment_date, price, is_paid, total_attend)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attend,
      ]
    );
    res.status(201).send(newPayment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await pool.query("SELECT * FROM payment");
    res.status(200).send(payments.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await pool.query("SELECT * FROM payment WHERE id = $1", [
      id,
    ]);
    res.status(200).send(payment.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attend,
    } = req.body;

    const updatedPayment = await pool.query(
      `UPDATE payment
       SET student_id = $1, payment_last_date = $2, payment_date = $3, price = $4, is_paid = $5, total_attend = $6
       WHERE id = $7`,
      [
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attend,
        id,
      ]
    );
    res.status(200).send({ updatedRows: updatedPayment.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await pool.query(
      "DELETE FROM payment WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedPayment.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
