const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require("node-device-detector/helper");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const addDevice = async (req, res) => {
  try {
    const { user_id, token } = req.body;
    const userAgent = req.headers["user-agent"];
    const result = detector.detect(userAgent);
    const { device, os, client } = result;

    const newDevice = await pool.query(
      `
      INSERT INTO device_tokens (user_id,
      device,
      os,
      client,
      token)
      values ($1, $2, $3, $4, $5) RETURNING *
      `,
      [user_id, device, os, client, token]
    );
    res.status(201).send(newDevice.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDevices = async (req, res) => {
  try {
    const devices = await pool.query(`SELECT * FROM device`);
    res.status(200).send(devices.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;

    const device = await pool.query(`SELECT * FROM device WHERE id = $1`, [id]);
    res.status(200).send(device.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, device, os, client, token } = req.body;

    const updateDevice = await pool.query(
      `UPDATE device set user_id = $1, device = $2, os = $3, client = $4, token = $5 WHERE id = $6`,
      [user_id, device, os, client, token, id]
    );
    res.status(200).send(updateDevice.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDeviceById = async (req, res) => {
  try {
    const { id } = req.params;

    const device = await pool.query(`DELETE FROM device WHERE id = $1`, [id]);
    res.status(200).send(device.rowCount);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
};
