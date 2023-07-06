const express = require("express");
const cors = require("cors");
const connect = require("./config/connectDb");
require("dotenv").config({ path: "./config/.env" });



const app = express(); 


connect();
//middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/level',require('./routes/levelRoute'))
app.use('/api/admin',require('./routes/adminRoute'))
app.use('/api/prof',require('./routes/professeurRoute'))
app.use('/api/etudiant',require('./routes/etudiantRoute'))
app.use('/api/groupe',require('./routes/groupeRoute'))
app.use('/api/groupeProf',require('./routes/groupeProfRoute'))
app.use('/api/groupeClass',require('./routes/groupeClassRoute'))
app.use('/api/classRoom',require('./routes/classRoomRoute'))



const port = process.env.Port || 5000;
//running the server 
app.listen(port, (err) => {
    err
      ? console.log(`Error occured while running the server.
      Error: ${err}`)
      : console.log(`Server is running on port ${port}.`);
  });