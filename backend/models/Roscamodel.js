const mongoose = require("mongoose");

const roscaSchema = new mongoose.Schema({
  roscaName: {
    type: String,
    required: true,
    message: "Name is required",
  },
  size: {
    type: Number,
    required: true,
    message: "Size is required",
  },
  amount: {
    type: Number,
    required: true,
    message: "Amount is required",
  },
  isAdmin: {
    type: Boolean,
  },
  duration: {
    type: String,
  },
  aadharNo: {
    type: Number,
  },
  members: {
    type: Array,
  },
  bid: {
    type: Array,
  },
});

const roscaModel = mongoose.model("roscas", roscaSchema);

module.exports = roscaModel;
