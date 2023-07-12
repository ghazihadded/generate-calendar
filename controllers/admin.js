const Admin=require('../models/Admin')
const Groupe=require('../models/Groupe')
const bcrypt = require("bcryptjs");
const {jsonWebToken}=require('../utils')
const jwt = require("jsonwebtoken");


exports.createAdmin=async(req,res)=>{
    const {email,password,name,role,level,speciality}=req.body
    try {
        
        const admin= await Admin.findOne({email})
        if(admin){ return res.status(200).json({status:false,message:"user has already exist"})}
        
          const newAdmin=await Admin.create({
            email,
            password,
            name,
            level:level &&level,
            speciality:speciality && speciality,
        })
    
        if(role){
          newAdmin.role=role
          
        }
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(password, salt);
        
        await newAdmin.save();

       
             const payload = {
            id: newAdmin._id,
          name:newAdmin.name,
          email:newAdmin.email,
          role:newAdmin.role,
          };
    
         jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
           if (err){ return  res.status(400).send(err);}
        
         return  res.status(200).json({
            status:true,
                token,
                user:{
                    name:newAdmin.name,
                    email:newAdmin.email,
                    _id:newAdmin._id,
                     role:newAdmin.role,
                     level:{
                      level:newAdmin?.level?.level
                     }
                },
              });
         });
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}



exports.login=async(req,res)=>{
    const {email,password}=req.body
    try {
        
        
        let admin= await Admin.findOne({email}) 
        if(!admin){ return res.status(200).json({status:false,message:"Invalid Credentials"})}
        
        const mdp = await bcrypt.compare(password,admin.password);
    if (!mdp) {
      return res.status(200).json({status:false, message: "Invalid Credentials" });
    }

    admin = await Admin.findOne({ email }).select("-password");
    const payload = {
        
          id: admin._id,
          name:admin.name,
          email:admin.email,
          role:admin.role,
      };

    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
          status:true,
          token,
          user:admin,
        });
      });
        
     
    } catch (err) {
        res.status(500).send(err)
    }
}



exports.getAdmin=async(req,res)=>{
  try {
   const admin=await Admin.findById(req.user.id) 
    res.status(200).json({user:admin})
  } catch (err) {
      res.status(500).send(err)
  }
}


exports.updateAdmin=async(req,res)=>{
  try {
      
     let user= await Admin.findById(req.user.id)
      
      console.log(req.body)
      user=await Admin.findOneAndUpdate({_id:req.user.id},{$set: req.body },{new:true})
      await user.save();
      res.status(200).send({ status: true, user });
      
   
  } catch (err) {
      res.status(500).send(err)
  }
}