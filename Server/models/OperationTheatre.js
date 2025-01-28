const mongoose = require('mongoose');

const operationTheatreSchema = mongoose.Schema(
  {
    otName: { type: String, required: true },
    otNumber: { type: String, required: true, unique: true },
    equipment: { type: [String], required: true },
    surgeon: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    surgeonName: { type: String, required: true },
    staff: { type: [mongoose.Schema.Types.ObjectId], ref: 'Staff' },
    staffNames: { type: [String] },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
    patients: [{
      patientName: { type: String, required: true },
      priority: { type: String, enum: ['high', 'medium', 'low'], required: true },  // Priority field
      assignedDate: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('OperationTheatre', operationTheatreSchema);
