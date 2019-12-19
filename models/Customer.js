const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", {
  type: {
    type: String,
    default: ""
  },
  etat: {
    type: String,
    default: ""
  },
  usage: {
    type: String,
    default: ""
  },
  situation: {
    type: String,
    default: ""
  },
  pays: {
    type: String,
    default: ""
  },
  ville: {
    type: String,
    default: ""
  },
  prix_achat: {
    type: String,
    default: ""
  },
  prix_travaux: {
    type: String,
    default: ""
  },
  frais_de_notaire: {
    type: String,
    default: ""
  },
  total: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  }
});

module.exports = Customer;
