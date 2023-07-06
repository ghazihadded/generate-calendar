const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middleware/auth");
const {createLevel,getLevel}=require('../controllers/level')
const {levelCreate,validate} =require('../middleware/validation')


router.post("/",levelCreate(),validate,createLevel); 
router.get("/",authenticateJWT,getLevel); 




module.exports = router;