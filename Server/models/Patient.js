const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    medicalHistory: { type: String },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    admissionDate: { type: Date, required: true },
    dischargeDate: { type: Date },
    medicalIssue: { type: String, required: true }, // Medical issue to match the room
    assignedRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    roomNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
