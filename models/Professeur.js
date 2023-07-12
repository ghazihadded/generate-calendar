const mongoose = require("mongoose");

const ProfesseurSchema = new mongoose.Schema({
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
    required:true,
  },
  speciality: {
    type:String,
    required: true,
  },
  role:{
    type:String ,
    default:"PROFESSEUR",
    required :true ,
    
},
  date: {
    type: Date,
    default: Date.now,
  },
});



ProfesseurSchema.post('save', function(doc, next) {
  doc.populate('level').then(function() {
    next();
  });
});



module.exports = mongoose.model("professeur", ProfesseurSchema);
