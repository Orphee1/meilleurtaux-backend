require("dotenv").config();

const mailgun = require("mailgun-js");

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Importation des modèles
require("./models/Customer");
require("./models/User");

// Importation des routes
const customersRoutes = require("./routes/customers");
const customerRoutes = require("./routes/customer");
const userRoutes = require("./routes/user");

// Activation des routes
app.use(customersRoutes);
app.use(customerRoutes);
app.use(userRoutes);

// Test Route
app.get("/", async (req, res) => {
  try {
    res.json({ message: "hello MeilleurTaux" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
