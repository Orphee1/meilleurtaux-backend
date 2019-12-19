const express = require("express");
const router = express.Router();

// Importation des modèles
const Customer = require("../models/Customer");

// READ ==========================================================

router.get("/customer", (req, res) => {
  console.log("route read customer OK");
  res.status(200).json({ message: "route read customer OK" });
});

// CREATE ========================================================

router.post("/customer/create", async (req, res) => {
  console.log("route create customer OK");

  let data = req.body;
  let type = data.type;
  let etat = data.etat;
  let usage = data.usage;
  let situation = data.situation;
  let pays = data.pays;
  let ville = data.ville;
  let prix_achat = data.prix_achat;
  let prix_travaux = data.prix_travaux;
  let frais_de_notaire = data.frais_de_notaire;
  let total = data.total;
  let email = data.email;
  try {
    const newCustomer = new Customer({
      type: type,
      etat: etat,
      usage: usage,
      situation: situation,
      pays: pays,
      ville: ville,
      prix_achat: prix_achat,
      prix_travaux: prix_travaux,
      frais_de_notaire: frais_de_notaire,
      total: total,
      email: email
    });
    await newCustomer.save();
    res.status(200).json({ message: "new customer created" });
    res.status(200).json(newCustomer);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "an error occured" });
  }
});

module.exports = router;
