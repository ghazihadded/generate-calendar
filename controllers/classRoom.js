const ClassRoom=require('../models/ClassRoom') 


exports.createClass=async(req,res)=>{
    const {title}=req.body
    try {
        if(!title){
          return  res.status(200).json({status:false,message:'title required'})
        }
        const classes= await ClassRoom.find()
 
        if(classes && classes.length>=6 ){
           return res.status(200).json({status:false,message:"you can't add another class-room"})
          
        } 
        
        if(classes && classes.find(el=>el.title === title)){
            return res.status(200).json({status:false,message:"this title of class-room has already exist"})
        }
       

        const newClass=await ClassRoom.create({
           title
        })

        
        
        await newClass.save();
        res.status(200).json({
            status:true,
            class:newClass
        })
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.getAllClass=async(req,res)=>{
   
    try {
        
        const classes= await ClassRoom.find()
        res.status(200).json({
            class:classes
        })
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteClass=async(req,res)=>{
   
    try {
        
        let classe=await ClassRoom.findOne({_id:req.params.id})
       
       if (!classe) {
        throw new Error("Error");
      }
     
     classe = await ClassRoom.findOneAndRemove({_id:req.params.id})
        res.status(200).send({ succes: true,classe});
        
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}


