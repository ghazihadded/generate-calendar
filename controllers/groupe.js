const Etudiant=require('../models/Etudiant')
const Groupe=require('../models/Groupe')
const GroupeProf=require('../models/GroupeProf')
const Level=require('../models/Level')



exports.createGroupe=async(req,res)=>{
    
    try {
        
       
       const user=await Etudiant.findById(req.params.id).populate('level')
       const groupes=await Groupe.find({level:user.level._id})
       
       const findUser= groupes.find(el=>el?._id?.toString()===user?.groupe?.toString())
    
       if(findUser){
        return res.status(200).json({status:false,message:"this etudiant his already exist in a groupe"})
       }

       

      const creation=async()=>{
       const newGroupe= await Groupe.create({
            level:user.level._id,
            members:1,
            number:user.level.level,
            disponibility:true,
           })
           await newGroupe.save();
           user.groupe=newGroupe._id
           await user.save()
          return res.status(200).json({status:true,message:`succes add to a groupe ${newGroupe.number} `})
      }
      
       
       if(groupes.length>0 && groupes.length<=5){
        let groupe=await Groupe.findOne({disponibility:true,level:user.level._id,members: {$lt: 11}})
       
        if(!groupe){
            creation()
        }else{
        if(groupe.members<11){
            const body={members:groupe.members+1}
            if(groupe.members+1===10){
          body.disponibility=false
            }
            const newGroupe=await Groupe.findOneAndUpdate({_id:groupe._id},{$set:body},{new:true})
            await newGroupe.save();
            user.groupe=newGroupe._id
            await user.save()
            return res.status(200).json({status:true,message:`succes add to a groupe ${newGroupe.number} `})
        }else{
            return res.status(200).json({status:false,message:"this groupe is completed(10members)"})
        }

        }
       }else if(groupes.length===0){
        creation()
       
       }else{
        return res.status(200).json({status:false,message:"you can't add more groupe,you have exceeded the allowed number"})
       }
        
      
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.deleteGroupe=async(req,res)=>{
    try {
        
    
     const groupe=await Groupe.findOneAndRemove({_id:req.params.id})
       if (!groupe) {
        throw new Error("Error");
      }
     
      await GroupeProf.findOneAndRemove({groupe:groupe._id})
        res.status(200).send({ succes: true,groupe});
        
     } catch (err) {
        res.status(500).send(err)
    }
}

exports.createGroupeDirect=async(req,res)=>{


    try {

     if(isNaN(Number(req.body.level)) || !req.body.level){
        return res.status(200).json({status:false,message:"level must be number"})
     }

      req.body.level=Number(req.body.level)

        const groupe= await Groupe.find({})
        if(groupe && groupe.length>=6 ){
            return res.status(200).json({status:false,message:"you can't add another groupe"})
           
         } 

         if( groupe.find(el=>el.number.toString() === req.body.level.toString())){
            return res.status(200).json({status:false,message:"this level of groupe has already exist"})
        }
   
   
        const level=await Level.findOne({level:req.body.level})


    if( !level){
    return res.status(200).json({status:false,message:"level not exist"})
     }    

        const newGroupe= await Groupe.create({
            level:level._id,
            members:0,
            number:level.level,
            disponibility:true,
           })
           await newGroupe.save();
           return res.status(200).json({status:true,groupe:newGroupe})
    } catch (err) {
        console.log(err)
    }
}


exports.getAllGroupe=async(req,res)=>{
   
    try {
        
        const groupe= await Groupe.find()
        res.status(200).json({
            groupe
        })
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}