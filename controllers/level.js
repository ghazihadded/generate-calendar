const Level=require('../models/Level')

exports.createLevel=async(req,res)=>{
 try {
    const newLevel= await Level.create(req.body)
    await newLevel.save()
    res.send(newLevel);
 } catch (err) {
    res.status(500).send(err)
 }
}


exports.getLevel=async(req,res)=>{
   try {
      const level= await Level.find()
     
      res.status(200).json({level});
   } catch (err) {
      res.status(500).send(err)
   }
  }