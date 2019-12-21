const express = require("express");
const router = express.Router();

// Importation des modèles
const Customer = require("../models/Customer");

// READ ==========================================================

router.get("/customer", async (req, res) => {
  console.log("route read customer OK");

  try {
    let id = req.query.id;
    const customerToFind = await Customer.findById(id);
    if (customerToFind) {
      res.status(200).json(customerToFind);
    } else {
      res.status(400).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
