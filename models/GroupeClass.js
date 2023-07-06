const mongoose = require("mongoose");

const GroupeClasseSchema = new mongoose.Schema({

    day: {
    type: String,
    required: true,
  },
  
  time: {
    type: String,
    required: true,
  },
  
  groupe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groupe",
  },
  classRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classRoom",
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
});


GroupeClasseSchema.post('save', function(doc, next) {
  doc.populate(['groupe', 'classRoom']).then(function() {
    next();
  });
});


module.exports = mongoose.model("groupeClasse", GroupeClasseSchema);
