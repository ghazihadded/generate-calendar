const mongoose = require("mongoose");

const GroupeSchema = new mongoose.Schema({

    members: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,

  },
  disponibility: {
    type: Boolean,
    default: true,
  },
 
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "level",
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("groupe", GroupeSchema);
