const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://HugoLattard:180577@cluster0-agmsf.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Importation des modèles

const port = 3000;

app.listen(3000, () => {
  console.log("Server started on port " + port);
});
