const router = require("express").Router();

const stageRouter = require("./stage.route");
const branchRouter = require("./branch.route");
const reasonRouter = require("./reason.route");
const statusRouter = require("./status.route");
const roleRouter = require("./role.route");
const groupRouter = require("./group.route");
const deviceRouter = require("./device.route");
const lidRouter = require("./lid.route");
const studentRouter = require("./student.route");
const paymentRouter = require("./payment.route");

router.use("/stage", stageRouter);
router.use("/branch", branchRouter);
router.use("/reason", reasonRouter);
router.use("/status", statusRouter);
router.use("/role", roleRouter);
router.use("/group", groupRouter);
router.use("/device", deviceRouter);
router.use("/lid", lidRouter);
router.use("/student", studentRouter);
router.use("/payment", paymentRouter);

module.exports = router;
