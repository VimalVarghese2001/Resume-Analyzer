const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const extractTextFromPDF = require("../services/pdfService");

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const resumeText = await extractTextFromPDF(req.file.path);

    res.status(200).json({
      message: "PDF parsed successfully!",
      resumeText: resumeText,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;