const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  level: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('level', LevelSchema);