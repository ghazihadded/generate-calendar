const Groupe = require("../models/Groupe");
const Classroom = require("../models/ClassRoom");
const GroupeClass = require("../models/GroupeClass");
const Admin=require('../models/Admin')

exports.generate = async (req, res) => {
  try {
    const groups = await Groupe.find();
    const classrooms = await Classroom.find();

    if (
      !groups ||
      !classrooms ||
      groups.length === 0 ||
      classrooms.length === 0
    ) {
      return res
        .status(200)
        .json({ status: false, message: "something is wrong" });
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let timeSlots = [
      "8h-9h",
      "9h-10h",
      "10h-11h",
      "11h-12h",
      "12h-13h",
      "13h-14h",
      "14h-15h",
      "15h-16h",
      "16h-17h",
    ];

    const matieres = ["mathémathique", "info", "science", "physique", "sport","anglais","technique"];

    
 

    let groupe = 0;
    let dayFilter = [];
    let dispo = true;
    let day;
    let classFilter = [];
    let timeText;
    let timeFilter = [];
    let objArray = [];
    let newObjArray=[];
    while (groupe < groups.length) {
      
      if (dayFilter.length === 0) {
        dayFilter = days;
      }

      if (classFilter.length === 0) {
        classFilter = classrooms;
      }

      day = Math.floor(Math.random() * dayFilter.length);
     
      if (!dispo) {
        timeFilter = timeFilter.filter((el) => el !== timeText);
        dispo = true;
      } else {
        timeFilter = timeSlots;
      }
      let matiereFilter = [];
      let matiere;
      let counter=0;
      for (let c = 0; c < classFilter.length; c++) {
        if (timeFilter.length === 0) {
          timeFilter = timeSlots;
        }
        if (matiereFilter.length === 0) {
          matiereFilter = matieres;
        }

        matiere = Math.floor(Math.random() * matiereFilter.length);

        for (let t = 0; t < timeSlots.length; t++) {
          
          if (!newObjArray.find(el=>el.day===dayFilter[day] && el.time===timeFilter[t])) {
          
            newObjArray.push({day:dayFilter[day],class:classFilter[c]._id,time:timeFilter[t],matiere:matiereFilter[matiere]})
            objArray.push({groupe:groups[groupe]._id,day:dayFilter[day],class:classFilter[c]._id,time:timeFilter[t],matiere:matiereFilter[matiere]})

            timeText = timeFilter[t];
            counter++
            dispo = false;
            break;
          }
        }
        if (!dispo) {
          classFilter = classFilter.filter((el) => el !== classFilter[c]);
           matiereFilter = matiereFilter.filter((el) => el !== matiereFilter[matiere]);
           timeFilter = timeFilter.filter((el) => el !== timeText);
        }
        if(counter ===3){
          break;
        }
      }

      dayFilter = dayFilter.filter((el) => el !== dayFilter[day]);

      if (dayFilter.length === 0) {
        groupe++;
      }
    }
    

    const groupeClasses = [];
     objArray.forEach(async (el,i) => {
      if (
        typeof el.day === "string" &&
        typeof el.time === "string" &&
        typeof el.matiere === "string"
      ) {
        const groupeClass = new GroupeClass({
          day: el.day,
          time: el.time,
          groupe: el.groupe,
          classRoom: el.class,
          matiere:el.matiere,
        });

        const newGroupeClass = await groupeClass.save();
        groupeClasses.push(newGroupeClass);
      }
      if(i === objArray.length-1){
       return res.status(200).json({ status: true,length:groupeClasses.length, groupeClasses });
      }
    
    });

   

    
  } catch (err) {
    console.log(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const groupeClasses = await GroupeClass.find().populate(['groupe', 'classRoom']);
    res.status(200).json({ groupeClasses });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await GroupeClass.deleteMany();
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
  }
};


exports.getByGroupe = async (req, res) => {
  
  try {
    const user = await Admin.findById(req.user.id)
    const groupeClasses = await GroupeClass.find({groupe:user.groupe}).populate(['groupe', 'classRoom']);
    res.status(200).json({ groupeClasses });
  } catch (error) {
    console.log(error);
  }
};