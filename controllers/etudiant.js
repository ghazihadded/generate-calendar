const Etudiant=require('../models/Etudiant')
const Groupe=require('../models/Groupe')
const Level=require('../models/Level')



exports.createEtudiant=async(req,res)=>{
    const {email,level,name}=req.body
    try {
        
        const user= await Etudiant.findOne({email})
        if(user){ return res.status(200).json({status:false,message:"user has already exist"})}
        
        const newUser= new  Etudiant({
            email,
            name,
            level,
        })

        
        await newUser.save()
        res.status(200).json({
            status:true,
            user:newUser
        })
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}



exports.updateEtudiant=async(req,res)=>{
    try {
        
       let user= await Etudiant.findById(req.params.id)
        if(!user){ return res.status(200).json({status:false,message:"user not found"})}
        
        user=await Etudiant.findOneAndUpdate({_id:req.params.id},{$set: req.body },{new:true})

      
        
        await user.save();
        res.status(200).send({ status: true, user });
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.deleteEtudinat=async(req,res)=>{
    try {
        
    
        
       const user=await Etudiant.findOneAndRemove({_id:req.params.id})
     
      
       if (!user) {
       return res.status(400).send('failed')
      }

      const groupe=await Groupe.findOne({_id:user?.groupe})
         groupe.members=groupe.members-1
         await groupe.save() 

        res.status(200).send({ succes: true,user});
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getEtudiant=async(req,res)=>{
    try {
        
    
        
       const users=await Etudiant.find().populate('level')
        res.status(200).send({ users});
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.getEtudiantById=async(req,res)=>{
    try {
        
        const user=await Etudiant.findById(req.params.id).populate('level')
       if(!user){ return res.status(400).json({message:"user not found"})}
        res.status(200).send({ user});
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}