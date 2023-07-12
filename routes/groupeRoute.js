const express = require("express");
const router = express.Router();
 
const authenticateJWT = require("../middleware/auth");
const {createGroupe,createGroupeDirect,deleteGroupe,getAllGroupe,getAllGroupeByGroupe}=require('../controllers/groupe')


router.post("/",authenticateJWT,createGroupeDirect) 
router.post("/create/:id",authenticateJWT,createGroupe); 
router.delete("/delete/:id",authenticateJWT,deleteGroupe)
router.get('/',authenticateJWT,getAllGroupe)
router.get('/byGroupe',authenticateJWT,getAllGroupeByGroupe)
     



module.exports = router;