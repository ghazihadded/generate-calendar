const mongoose = require("mongoose");

const GroupeProfSchema = new mongoose.Schema({

   
    professeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "professeur",
      },

    groupe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groupe",
  },

   date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("groupeProf", GroupeProfSchema);
