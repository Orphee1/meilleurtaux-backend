const express = require("express");
const router = express.Router();
const uid2 = require("uid2");

// READ ==========================================================
router.post("/log-in", async (req, res) => {
  console.log("Login OK");

  const user = {
    token: uid2(64)
  };

  try {
    let password = req.body.password;
    console.log(password);

    console.log(user.token);
    if (password === "tothemoon") {
      res.status(200).json(user.token);
      console.log("Authentification OK");
    } else {
      res.json({ message: "authentification failed" });
      console.log("Authentification failed");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
