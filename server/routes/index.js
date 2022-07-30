const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/api/v1/user", require("./api/v1/user"));
router.use(
  "/api/v1/leads",
  passport.authenticate("jwt", { session: false }),
  require("./api/v1/lead")
);

module.exports = router;
