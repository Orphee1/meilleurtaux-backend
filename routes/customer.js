const express = require("express");
const router = express.Router();

// Importation des modèles
const Customer = require("../models/Customer");

// READ ========================

router.get("/customer", (req, res) => {
  console.log("route read customer OK");
  res.status(200).json({ message: "route read customer OK" });
});
// CREATE ======================
router.post("/customer/create", (req, res) => {
  console.log("route create customer OK");
  res.status(200).json({ message: "route create customer OK" });
});

module.exports = router;
