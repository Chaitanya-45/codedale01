const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: [
    {
      label: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      options: { type: [String], default: [] },
    },
  ],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", FormSchema);