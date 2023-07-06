const express = require("express");
const router = express.Router();
 
const {createAdmin,login,getAdmin,updateAdmin}=require('../controllers/admin')
const {addAdmin,validate,loginValidation} =require('../middleware/validation')
const authenticateJWT = require("../middleware/auth");

router.post("/",addAdmin(),validate,createAdmin); 
router.post("/login",loginValidation(),validate,login);
router.get("/",authenticateJWT,getAdmin);
router.put("/",authenticateJWT,updateAdmin);




module.exports = router;