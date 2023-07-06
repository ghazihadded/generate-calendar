const mongoose = require("mongoose");

const ClassRoomSchema = new mongoose.Schema({

   
    title: {
        type: String,
        required:true,
      },
       date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("classRoom", ClassRoomSchema);
