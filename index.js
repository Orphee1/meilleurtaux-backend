require("dotenv").config();

const mailgun = require("mailgun-js");
const API_KEY = "key-0e0307189be7ed0249cbb73e7909f8cf";
const DOMAIN = "mg.lereacteur.io";
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

// Importation des routes
const customersRoutes = require("./routes/customers");
const customerRoutes = require("./routes/customer");

// Activation des routes
app.use(customersRoutes);
app.use(customerRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
