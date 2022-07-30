const express = require("express");

const leadRouter = express.Router();
const leadController = require("../../../controllers/leadController");
leadRouter.get("/", leadController.getLeads);

module.exports = leadRouter;
