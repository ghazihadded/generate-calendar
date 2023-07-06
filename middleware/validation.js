const { body, validationResult } = require("express-validator");

const addAdmin = () => [
  body("name", "please enter your name").notEmpty(),
  body("email", "please enter your email").isEmail(),
  body("password", "your password not up to specification").isLength({min: 6,max:10}),

  ];

  const addProf = () => [
    body("name", "please enter your name").notEmpty(),
    body("email", "please enter your email").isEmail(),
    body("level", "level is required").notEmpty(),
    body("speciality", "enter your speciality").notEmpty(),
  
    ];


    const addEtudiant = () => [
      body("name", "please enter your name").notEmpty(),
      body("email", "please enter your email").isEmail(),
      body("level", "level is required").notEmpty(),
    
      ];

  const loginValidation = () => [
    body("email", "please enter your email").isEmail(),
    body("password", "enter your password").notEmpty(),
  
    ];

const levelCreate = () => [
  body("level","please enter correct level number").notEmpty().isInt({ min: 1, max: 10 }),
];

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).send(error.array());
  } else { 
    next();
  }
};

module.exports = {
  validate,
  levelCreate,
  addAdmin,
  loginValidation,
  addProf,
  addEtudiant,
};