const {
  addDevice,
  getAllDevices,
  getDeviceById,
  updateDeviceById,
  deleteDeviceById,
} = require("../controllers/device.controller");

const router = require("express").Router();

router.post("/", addDevice);
router.get("/", getAllDevices);
router.get("/:id", getDeviceById);
router.put("/:id", updateDeviceById);
router.delete("/:id", deleteDeviceById);

module.exports = router;
