const express = require("express");
const router = express.Router();

// READ ==========================================================
router.post("/log-in", (req, res) => {
  console.log("Login OK");
  res.json({ message: "Login OK" });
});

module.exports = router;
