const express = require("express");
const router = express.Router();

const mailgun = require("mailgun-js");
const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

// Importation des modèles
const Customer = require("../models/Customer");

// READ ALL ==========================================================

router.get("/customers", async (req, res) => {
  console.log("route read customer OK");

  try {
    const allCustomers = await Customer.find();
    res.status(200).json(allCustomers);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// CREATE ========================================================

router.post("/customers/create", async (req, res) => {
  console.log("route create customer OK");
  console.log(req.body);

  const {
    type,
    etat,
    usage,
    situation,
    pays,
    ville,
    prix_achat,
    prix_travaux,
    frais_de_notaire,
    total,
    email,
    number
  } = req.body;

  try {
    const newCustomer = new Customer({
      type,
      etat,
      usage,
      situation,
      pays,
      ville,
      prix_achat,
      prix_travaux,
      frais_de_notaire,
      total,
      email,
      number
    });
    await newCustomer.save();

    res.status(200).json(newCustomer._id);

    const data = {
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: email,
      subject: "Meilleurtaux.com: récapitulatif de votre demande:",
      text:
        "Type de bien: " +
        type +
        "; Etat du bien: " +
        etat +
        "; Usage du bien: " +
        usage +
        "; Votre situation: " +
        situation +
        "; Pays: " +
        pays +
        "; Ville: " +
        ville +
        "; Prix d'achat: " +
        prix_achat +
        "; Montant des travaux: " +
        prix_travaux +
        "; Frais de notaire: " +
        frais_de_notaire +
        "; Coût total: " +
        total +
        " Votre numéro de dossier: " +
        number +
        "; Merci, à bientôt !"
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "an error occured" });
  }
});

// DELETE ========================================================
router.post("/customers/delete", async (req, res) => {
  console.log("route delete ok");
  try {
    let id = req.query.id;
    const customerToDelete = await Customer.findById(id);
    if (customerToDelete) {
      customerToDelete.remove();
      res.status(200).json({ message: "Customer removed" });
    } else {
      res.json({ message: "Customer not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
