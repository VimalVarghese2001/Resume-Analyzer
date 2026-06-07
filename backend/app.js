const express = require("express");
const cors = require("cors");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/applications", applicationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analyze", aiRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("PrepPilot AI Backend Running 🚀");
});

module.exports = app;