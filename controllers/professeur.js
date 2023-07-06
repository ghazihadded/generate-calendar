const Professeur=require('../models/Professeur')
const GroupeProf=require('../models/GroupeProf')



exports.createProf=async(req,res)=>{
    const {email,speciality,level,name}=req.body
    try {
        
        const user= await Professeur.findOne({email})
        if(user){ return res.status(200).json({status:false,message:"user has already exist"})}
        
        const newUser=await Professeur.create({
            email,
            speciality,
            name,
            level,
        })

        
        
        await newUser.save();
        res.status(200).json({
            status:true,
            user:newUser
        })
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}



exports.updateProf=async(req,res)=>{
    try {
        
       let user= await Professeur.findById(req.params.id)
        if(!user){ return res.status(400).json({ status: false,message:"user not found"})}
        
        user=await Professeur.findOneAndUpdate({_id:req.params.id},{$set: req.body },{new:true})

      
        
        await user.save();
        res.status(200).send({ status: true, user });
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.deleteProf=async(req,res)=>{
    try {
        
    
     const user=await Professeur.findOneAndRemove({_id:req.params.id})
       if (!user) {
        throw new Error("Error");
      }
     
      await GroupeProf.findOneAndRemove({professeur:user._id})
        res.status(200).send({ succes: true,user});
        
     } catch (err) {
        res.status(500).send(err)
    }
}

exports.getProfs=async(req,res)=>{
    try {
        
    
        
       const users=await Professeur.find().populate('level')
        res.status(200).send({ users});
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.getProfById=async(req,res)=>{
    try {
        
        const user=await Professeur.findById(req.params.id).populate('level')
       if(!user){ return res.status(400).json({message:"user not found"})}
        res.status(200).send({user});
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}