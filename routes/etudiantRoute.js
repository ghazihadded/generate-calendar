const express = require("express");
const router = express.Router();
 
const authenticateJWT = require("../middleware/auth");
const {createEtudiant,updateEtudiant,deleteEtudinat,getEtudiant,getEtudiantById}=require('../controllers/etudiant')
const {validate,addEtudiant} =require('../middleware/validation')


router.post("/",authenticateJWT,addEtudiant(),validate,createEtudiant); 
router.put("/update/:id",authenticateJWT,updateEtudiant); 
router.delete("/delete/:id",authenticateJWT,deleteEtudinat); 
router.get("/",authenticateJWT,getEtudiant); 
router.get("/:id",authenticateJWT,getEtudiantById); 




module.exports = router;