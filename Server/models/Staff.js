const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    contact: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    shift: { type: String, required: true },
    salary: { type: Number, required: true },
  });
  
module.exports = mongoose.model('Staff', staffSchema);