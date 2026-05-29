const mongoose = require("mongoose");

const repostSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postModel",
    required: true,
  },

  repostBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const repostModel = mongoose.model("repostModel", repostSchema);

module.exports = repostModel;
