const router = require("express").Router();

const stageRouter = require("./stage.route");
const branchRouter = require("./branch.route");
const reasonRouter = require("./reason.route");
const statusRouter = require("./status.route");
const roleRouter = require("./role.route");

router.use("/stage", stageRouter);
router.use("/branch", branchRouter);
router.use("/reason", reasonRouter);
router.use("/status", statusRouter);
router.use("/role", roleRouter);

module.exports = router;
