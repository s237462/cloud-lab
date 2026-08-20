const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    email: String
});

module.exports = mongoose.model("Student", studentSchema);