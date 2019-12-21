const express = require("express");
const router = express.Router();

const mailgun = require("mailgun-js");
const API_KEY = "key-0e0307189be7ed0249cbb73e7909f8cf";
const DOMAIN = "mg.lereacteur.io";
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

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

module.exports = router;
