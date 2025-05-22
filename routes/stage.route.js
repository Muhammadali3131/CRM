const {
  addStage,
  getAllStages,
  getStageById,
  updateStageById,
  deleteStageById,
} = require("../controllers/stage.controller");

const router = require("express").Router();

router.post("/", addStage);
router.get("/", getAllStages);
router.get("/:id", getStageById);
router.put("/:id", updateStageById);
router.delete("/:id", deleteStageById);

module.exports = router;
