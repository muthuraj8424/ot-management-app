const OperationTheatre = require('../models/OperationTheatre');
const Staff = require('../models/Staff');

const addOT = async (req, res) => {
  const { 
    otName, 
    otNumber, 
    equipment, 
    surgeon, 
    surgeonName, 
    staffIds,
    staffNames, 
    status 
  } = req.body;

  console.log(req.body);

  // Validate required fields
  if (!otName || !otNumber || !equipment || !surgeon || !surgeonName) {
    return res.status(400).json({ message: 'OT Name, OT Number, Equipment, Surgeon ID, and Surgeon Name are required' });
  }

  try {
    // Create new OT entry in the database with the updated schema structure
    const newOT = await OperationTheatre.create({
      otName,
      otNumber,
      equipment,
      surgeon,
      surgeonName:surgeonName,
      staff: staffIds || [],
      staffNames: staffNames || [],
      status: status || 'available',  // Default to 'available' if not provided
      patients: []  // Initializing the OT with no patients
    });

    // Respond with the created OT entry
    res.status(201).json({newOT,success:true,message:"OT added sucessfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOTs = async (req, res) => {
  try {
    const ots = await OperationTheatre.find().populate('surgeon', 'name').populate('staff', 'name');
    res.status(200).json(ots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOT = async (req, res) => {
  const { id } = req.params;
  const { otName, otNumber, equipment, surgeonId, surgeonName, staffIds, staffNames, status } = req.body;
  try {
    const ot = await OperationTheatre.findById(id);
    if (!ot) {
      return res.status(404).json({ message: 'Operation Theatre not found' });
    }

    ot.otName = otName || ot.otName;
    ot.otNumber = otNumber || ot.otNumber;
    ot.equipment = equipment || ot.equipment;
    ot.surgeon = surgeonId || ot.surgeon;
    ot.surgeonName = surgeonName || ot.surgeonName;
    ot.staff = staffIds || ot.staff;
    ot.staffNames = staffNames || ot.staffNames;
    ot.status = status || ot.status;

    const updatedOT = await ot.save();
    res.status(200).json({updatedOT,success:true,message:"Ot Updated sucessfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchById=async(req,res)=>{
  try {
    const operationTheatre = await OperationTheatre.findById(req.params.id)
      .populate('surgeon', 'name')
      .populate('staff', 'name');
    if (!operationTheatre) {
      return res.status(404).json({ message: 'Operation Theatre not found' });
    }
    res.status(200).json(operationTheatre);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operation theatre', error: error.message });
  }
}

const ManageOTS =  async (req, res) => {
  try {
    const ots = await OperationTheatre.find(); // Fetch all OTs from the database
    res.status(200).json(ots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operation theatres', error: error.message });
  }
};

const deletedOT =  async (req, res) => {
try {
  const deletedOT = await OperationTheatre.findByIdAndDelete(req.params.id);
  if (!deletedOT) {
    return res.status(404).json({ message: 'Operation Theatre not found' });
  }
  res.status(200).json({ message: 'Operation Theatre deleted successfully' });
} catch (error) {
  res.status(500).json({ message: 'Error deleting operation theatre', error: error.message });
}
}

// const assignPatientToOT = async (req, res) => {
//   const { patientName, priority, otNumber, action } = req.body; // action field is used to indicate if a patient is discharged

//   // Validate required fields
//   if (!patientName || !priority || !otNumber) {
//     return res.status(400).json({ message: 'Patient Name, Priority, and OT Number are required' });
//   }

//   try {
//     // Find the OT based on the otNumber
//     const ot = await OperationTheatre.findOne({ otNumber });

//     // If OT does not exist
//     if (!ot) {
//       return res.status(404).json({ message: 'Operation Theatre not found' });
//     }

//     // If the action is "discharge" and a patient is being discharged
//     if (action === 'discharge') {
//       // Check if the patient exists in the OT's patients list
//       const patientExists = ot.patients.some(patient => patient.patientName === patientName);

//       // If patient does not exist, throw an error
//       if (!patientExists) {
//         return res.status(404).json({ message: `Patient with name "${patientName}" not found in OT`,success:false });
//       }

//       // Remove the patient who is discharged from the OT's patients list
//       ot.patients = ot.patients.filter(patient => patient.patientName !== patientName);

//       // After discharge, re-sort patients by priority (high > medium > low)
//       const priorityOrder = { high: 1, medium: 2, low: 3 };
//       ot.patients.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

//       // If the OT has remaining patients, assign the next highest priority patient
//       if (ot.patients.length > 0) {
//         ot.status = 'occupied'; // Ensure OT remains occupied if there are patients left
//       } else {
//         ot.status = 'available'; // OT becomes available if no patients remain
//       }

//       // Save the updated OT
//       await ot.save();

//       return res.status(200).json({ message: 'Patient discharged and next patient moved to OT', ot,success:true });
//     }

//     // If OT is available, assign the new patient to the OT
//     if (ot.status === 'available') {
//       // Assign the new patient to the OT
//       ot.patients.push({
//         patientName,
//         priority,
//         assignedDate: new Date(),
//       });

//       // Sort the patients by priority (high > medium > low)
//       const priorityOrder = { high: 1, medium: 2, low: 3 };
//       ot.patients.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

//       // Mark the OT as occupied now that it's assigned
//       ot.status = 'occupied';

//       // Save the updated OT
//       await ot.save();

//       return res.status(200).json({ message: 'Patient assigned to OT based on priority', ot ,success:true});
//     }

//     // If OT is occupied, check priority and assign accordingly
//     if (ot.status === 'occupied') {
//       // Add the new patient to the OT's patients list
//       ot.patients.push({
//         patientName,
//         priority,
//         assignedDate: new Date(),
//       });

//       // Sort patients by priority (high > medium > low)
//       const priorityOrder = { high: 1, medium: 2, low: 3 };
//       ot.patients.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

//       // Save the updated OT
//       await ot.save();

//       return res.status(200).json({ message: 'Patient assigned to OT based on priority', ot });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'An error occurred while assigning the patient' });
//   }
// };


const assignPatientToOT = async (req, res) => {
  const { patientName, priority, otNumber, action } = req.body; // Action to handle discharging patients

  // Validate required fields
  if (!patientName || !priority || !otNumber) {
    return res.status(400).json({ message: 'Patient Name, Priority, and OT Number are required', success: false });
  }

  try {
    // Find the OT by otNumber
    const ot = await OperationTheatre.findOne({ otNumber });

    if (!ot) {
      return res.status(404).json({ message: 'Operation Theatre not found', success: false });
    }

    // Handle discharging a patient
    if (action === 'discharge') {
      const patientExists = ot.patients.some((patient) => patient.patientName === patientName);
      if (!patientExists) {
        return res.status(404).json({ message: `Patient "${patientName}" not found in OT`, success: false });
      }

      // Remove the discharged patient
      ot.patients = ot.patients.filter((patient) => patient.patientName !== patientName);

      // If there are other patients, assign the next one based on priority
      if (ot.patients.length > 0) {
        // Sort by priority (high > medium > low)
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        ot.patients.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        // Ensure OT status remains occupied
        ot.status = 'occupied';
      } else {
        // If no patients remain, mark OT as available
        ot.status = 'available';
      }

      await ot.save();
      return res.status(200).json({ message: 'Patient discharged. Next patient assigned based on priority.', ot, success: true });
    }

    // Handle initial assignment (First-Come-First-Serve)
    if (ot.status === 'available') {
      ot.patients.push({ patientName, priority, assignedDate: new Date() });
      ot.status = 'occupied';
      await ot.save();
      return res.status(200).json({ message: 'Patient assigned to OT', ot, success: true });
    }

    // OT is occupied: Add patient to the list
    ot.patients.push({ patientName, priority, assignedDate: new Date() });

    // Patients are queued; no reassignment until discharge
    await ot.save();
    return res.status(200).json({ message: 'Patient added to the queue. Priority will be considered after discharge.', ot, success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'An error occurred while assigning the patient', success: false });
  }
};

// the above is ==== > first come first serve


module.exports = { addOT, getOTs,ManageOTS,updateOT,fetchById,deletedOT,assignPatientToOT };
