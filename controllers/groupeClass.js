const Groupe = require("../models/Groupe");
const Classroom = require("../models/ClassRoom");
const GroupeClass = require("../models/GroupeClass");

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

    const obj = {};
    const objGroup = {};

    let groupe = 0;
    let dayFilter = [];
    let dispo = true;
    let day;
    let classFilter = [];
    let timeText;
    let timeFilter = [];
    while (groupe < groups.length) {
      if (!objGroup[groups[groupe]._id]) {
        objGroup[groups[groupe]._id] = {};
      }

      if (dayFilter.length === 0) {
        dayFilter = days;
      }

      if (classFilter.length === 0) {
        classFilter = classrooms;
      }

      day = Math.floor(Math.random() * dayFilter.length);

      if (!obj[dayFilter[day]]) {
        obj[dayFilter[day]] = {};
      }
      if (!objGroup[groups[groupe]._id][dayFilter[day]]) {
        objGroup[groups[groupe]._id][dayFilter[day]] = {};
      }

      if (!dispo) {
        timeFilter = timeFilter.filter((el) => el !== timeText);
        dispo = true;
      } else {
        timeFilter = timeSlots;
      }
      for (let c = 0; c < classFilter.length; c++) {
        if (timeFilter.length === 0) {
          timeFilter = timeSlots;
        }
        if (!obj[dayFilter[day]][classFilter[c]._id]) {
          obj[dayFilter[day]][classFilter[c]._id] = {};
        }
        if (!objGroup[groups[groupe]._id][dayFilter[day]][classFilter[c]._id]) {
          objGroup[groups[groupe]._id][dayFilter[day]][classFilter[c]._id] = {};
        }

        for (let t = 0; t < timeSlots.length; t++) {
          if (
            obj[dayFilter[day]][classFilter[c]._id][timeFilter[t]] !==
            timeFilter[t]
          ) {
            obj[dayFilter[day]][classFilter[c]._id][timeFilter[t]] =
              timeFilter[t];
            objGroup[groups[groupe]._id][dayFilter[day]][classFilter[c]._id] =
              timeFilter[t];

            timeText = timeFilter[t];
            dispo = false;
            break;
          }
        }
        if (!dispo) {
          classFilter = classFilter.filter((el) => el !== classFilter[c]);
          break;
        }
      }

      dayFilter = dayFilter.filter((el) => el !== dayFilter[day]);

      if (dayFilter.length === 0) {
        groupe++;
      }
    }

    const arr = [];
    for (const groupKey in objGroup) {
      const group = objGroup[groupKey];
      for (const dayKey in group) {
        const day = group[dayKey];
        for (const classKey in day) {
          const time = day[classKey];
          arr.push({
            groupe: groupKey,
            day: dayKey,
            class: classKey,
            time: time,
          });
        }
      }
    }

    const groupeClasses = [];
     arr.forEach(async (el,i) => {
      if (
        typeof el.day === "string" &&
        typeof el.time === "string" &&
        typeof el.groupe === "string" &&
        typeof el.class === "string"
      ) {
        const groupeClass = new GroupeClass({
          day: el.day,
          time: el.time,
          groupe: el.groupe,
          classRoom: el.class,
        });

        const newGroupeClass = await groupeClass.save();
        groupeClasses.push(newGroupeClass);
      }
      if(i === arr.length-1){
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
