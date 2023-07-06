const mongoose= require("mongoose")


 
const connect=()=>{

    mongoose.connect(process.env.DB_LOCAL_URI,{ useUnifiedTopology: true , useNewUrlParser: true })
    .then(()=>console.log("connect in db"))
    .catch(err=>console.log(err))
}
    
 


module.exports= connect 