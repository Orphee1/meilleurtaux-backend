const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Importation des modèles
const User = require("../models/User");

// READ ==========================================================
router.post("/log-in", async (req, res) => {
  console.log("Login OK");

  try {
    const password = req.body.password;
    const hashToFind = SHA256(password).toString(encBase64);
    console.log(hashToFind);
    const userToFind = await User.findOne({ hash: hashToFind });

    if (userToFind) {
      res.status(200).json(userToFind);
    } else {
      res.status(400).json({ message: "authentification failed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// // CREATE ========================================================
router.post("/sign-up", async (req, res) => {
  console.log("Sign-up OK");
  try {
    const password = req.body.password;
    const token = uid2(64);
    const hash = SHA256(password).toString(encBase64);
    const newUser = new User({
      token,
      hash
    });

    await newUser.save();
    res.json({
      _id: newUser._id,
      token: newUser.token
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
