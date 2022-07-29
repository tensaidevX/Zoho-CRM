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

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;
