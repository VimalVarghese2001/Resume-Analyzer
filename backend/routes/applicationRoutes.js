const express = require("express");
const router = express.Router();

const Application = require("../models/Application");

// GET all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE application
router.post("/", async (req, res) => {
  try {
    const { company, role, } = req.body;

    const application = await Application.create({
      company,
      role,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;