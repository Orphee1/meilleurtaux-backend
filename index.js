require("dotenv").config();

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
const customerRoutes = require("./routes/customer");

// Activation des routes
app.use(customerRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
