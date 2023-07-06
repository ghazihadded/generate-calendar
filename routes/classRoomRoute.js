const express = require("express");
const router = express.Router();
 
const authenticateJWT = require("../middleware/auth");
const {createClass,getAllClass,deleteClass}=require('../controllers/classRoom')


router.post("/",authenticateJWT,createClass); 
router.delete("/delete/:id",authenticateJWT,deleteClass); 
 router.get("/",authenticateJWT,getAllClass); 





module.exports = router;