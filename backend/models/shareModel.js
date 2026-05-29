const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.types.ObjectId,
    ref: "postModel",
    required: true,
  },

  shareBy: {
    type: mongoose.Schema.types.ObjectId,
    ref: "userModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const shareModel = mongoose.model("shareModel", shareSchema);

module.exports = shareModel;
