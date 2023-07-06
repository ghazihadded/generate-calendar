const mongoose = require("mongoose");

const EtudiantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
   email: {
    type: String,
    required: true,
  },
 
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "level",
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


EtudiantSchema.post('save', function(doc, next) {
  doc.populate('level').then(function() {
    next();
  });
});



module.exports = mongoose.model("etudiant", EtudiantSchema);
