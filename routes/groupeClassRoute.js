const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth");
 
const {generate,getAll,deleteAll,getByGroupe}=require('../controllers/groupeClass')



router.post("/",generate); 
router.get("/",authenticateJWT,getAll); 
router.get("/byGroupe",authenticateJWT,getByGroupe); 
router.delete("/",authenticateJWT,deleteAll); 





module.exports = router;