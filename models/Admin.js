const mongoose= require('mongoose')

const AdminSchema=new mongoose.Schema({
    name:{
        type:String ,
        required:true ,
    },
    email:{
        type:String,
        required:true,
    },
    
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "level",
  },

  groupe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groupe", 
  },
  speciality: {
    type:String,
    
  },
    password:{
        type:String ,
        required :true ,
        
    }, 
    role:{
        type:String ,
        default:"ADMIN",
        required :true ,
        
    },
    date:{
        type:Date ,
        default: Date.now
    }
})


AdminSchema.post('save', function(doc, next) {
  doc.populate('level').then(function() {
    next();
  });
});


module.exports=mongoose.model('admin',AdminSchema)