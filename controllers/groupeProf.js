const GroupeProf=require('../models/GroupeProf')



exports.createGroupeProf=async(req,res)=>{
    const {groupe_id,Professeur_id}=req.query
    try {
        
        const prof= await GroupeProf.findOne({groupe:groupe_id,professeur:Professeur_id})
        if(prof){ return res.status(400).json({message:"prof has already in this groupe"})}
        
        const newProfGroupe=await GroupeProf.create({
            groupe:groupe_id,
            professeur:Professeur_id,
        })

        
        
        await newProfGroupe.save();
        res.status(200).json({
           succes:true,
           message:"create successfully"
        })
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}