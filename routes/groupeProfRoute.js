const express = require("express");
const router = express.Router();
 
const authenticateJWT = require("../middleware/auth");
const {createGroupeProf}=require('../controllers/groupeProf')


router.post("/",authenticateJWT,createGroupeProf); 





module.exports = router;