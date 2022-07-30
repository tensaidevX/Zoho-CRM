const mongoose = require("mongoose");
const LeadSchema = new mongoose.Schema({
  leads: {
    type: Array,
    required: true,
  },
  source_data: {
    type: Object,
    required: true,
  },
});

const Lead = mongoose.model("Lead", LeadSchema);

module.exports = Lead;
