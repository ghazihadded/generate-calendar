const express = require("express");
const router = express.Router();
 
const authenticateJWT = require("../middleware/auth");
const {createProf,updateProf,deleteProf,getProfs,getProfById,getProfByLevel}=require('../controllers/professeur')
const {validate,addProf} =require('../middleware/validation')


router.post("/",authenticateJWT,addProf(),validate,createProf); 
router.put("/update/:id",authenticateJWT,updateProf); 
router.delete("/delete/:id",authenticateJWT,deleteProf); 
router.get("/",authenticateJWT,getProfs); 
router.get("/level",authenticateJWT,getProfByLevel); 
router.get("/:id",authenticateJWT,getProfById); 





module.exports = router;