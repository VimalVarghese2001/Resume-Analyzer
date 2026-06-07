const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    companyName: String,

    jobRole: String,

    resumeName: String,

    analysis: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);