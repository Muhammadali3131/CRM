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
const lessonRouter = require("./lesson.route");
const student_lessonRouter = require("./student_lesson.route");
const student_groupRouter = require("./student_group.route");
const otpRouter = require("./otp.route");
const stuffRouter = require("./stuff.route");
const group_stuffRouter = require("./group_stuff.route");
const stuff_roleRouter = require("./stuff_role.route");

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
router.use("/lesson", lessonRouter);
router.use("/stulesson", student_lessonRouter);
router.use("/stugroup", student_groupRouter);
router.use("/otp", otpRouter);
router.use("/stuff", stuffRouter);
router.use("/group_stuff", group_stuffRouter);
router.use("/stuff_role", stuff_roleRouter);

module.exports = router;
