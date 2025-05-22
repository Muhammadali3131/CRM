const {
  addReason,
  getAllReasons,
  getReasonById,
  updateReasonById,
  deleteReasonById,
} = require("../controllers/reason.controller");

const router = require("express").Router();

router.post("/", addReason);
router.get("/", getAllReasons);
router.get("/:id", getReasonById);
router.put("/:id", updateReasonById);
router.delete("/:id", deleteReasonById);

module.exports = router;
