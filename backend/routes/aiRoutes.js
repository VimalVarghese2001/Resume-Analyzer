const express = require("express");
const router = express.Router();

const analyzeResume = require("../services/geminiService");
const Analysis = require("../models/Analysis");

// GET all analyses

router.get("/", async (req, res) => {
  try {
    const analyses = await Analysis.find().sort({
      createdAt: -1,
    });

    res.json(analyses);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE analysis

router.post("/", async (req, res) => {
  try {

    const {
      companyName,
      jobRole,
      resumeText,
      jobDescription,
    } = req.body;

    const result = await analyzeResume(
      companyName,
      jobRole,
      resumeText,
      jobDescription
    );


    // Save AI report to MongoDB
    await Analysis.create({
      companyName,
      jobRole,
      resumeName: "Uploaded Resume",
      analysis: result,
    });

    res.status(200).json({
      analysis: result,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;