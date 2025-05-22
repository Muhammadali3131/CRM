const {
  addBranch,
  getAllBranches,
  getBranchById,
  updateBranchById,
  deleteBranchById,
} = require("../controllers/branch.controller");

const router = require("express").Router();

router.post("/", addBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchById); 
router.put("/:id", updateBranchById);
router.delete("/:id", deleteBranchById);

module.exports = router;
