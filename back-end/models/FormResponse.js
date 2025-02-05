const mongoose = require("mongoose");

const FormResponseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  responses: { type: Object, required: true }, // key-value pairs: { fieldName: answer }
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FormResponse", FormResponseSchema);