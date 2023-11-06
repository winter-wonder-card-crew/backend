const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
    },
    receiver: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "card",
  }
);

module.exports = mongoose.model("card", cardSchema);
