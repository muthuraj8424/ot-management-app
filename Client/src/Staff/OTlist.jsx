// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const OTList = () => {
//   const [ots, setOts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOTs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/ots', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch OTs:', error.message);
//       }
//     };

//     fetchOTs();
//   }, []);

//   const handleOTClick = (otNumber) => {
//     navigate(`/add-patient/${otNumber}`);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-6">Operation Theatres</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {ots.map((ot) => (
//           <div
//             key={ot.otNumber}
//             className="p-4 bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg transition"
//             onClick={() => handleOTClick(ot.otNumber)}
//           >
//             <h3 className="text-lg font-bold text-indigo-600">{ot.otName}</h3>
//             <p><strong>OT Number:</strong> {ot.otNumber}</p>
//             <p><strong>Equipment:</strong> {ot.equipment.join(', ')}</p>
//             <p><strong>Surgeon:</strong> {ot.surgeonName}</p>
//             <p><strong>Staff:</strong> {ot.staffNames.join(', ')}</p>
//             <p><strong>Status:</strong> {ot.status}</p>
//             <div className="mt-3">
//               <h4 className="font-semibold text-gray-800">Patients:</h4>
//               {ot.patients.length > 0 ? (
//                 <ul className="list-disc pl-5">
//                   {ot.patients.map((patient, index) => (
//                     <li key={index}>
//                       <span className="font-medium">{patient.patientName}</span> -
//                       <span className={`ml-2 ${getPriorityClass(patient.priority)}`}>
//                         {patient.priority.toUpperCase()}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-500">No patients allocated.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   function getPriorityClass(priority) {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return 'text-red-600';
//       case 'medium':
//         return 'text-yellow-500';
//       case 'low':
//         return 'text-green-500';
//       default:
//         return 'text-gray-600';
//     }
//   }
// };

// export default OTList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTList = () => {
  const [ots, setOts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOTs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/ots", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOts(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Failed to fetch OTs:", error.message);
      }
    };

    fetchOTs();
  }, []);

  const handleOTClick = (otNumber) => {
    navigate(`/patient-management/${otNumber}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Operation Theatres
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ots.map((ot) => (
          <div
            key={ot.otNumber}
            className="p-4 bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg transition"
            onClick={() => handleOTClick(ot.otNumber)}
          >
            <h3 className="text-lg font-bold text-indigo-600">{ot.otName}</h3>
            <p>
              <strong>OT Number:</strong> {ot.otNumber}
            </p>
            <p>
              <strong>Equipment:</strong> {ot.equipment.join(", ")}
            </p>
            <p>
              <strong>Surgeon:</strong> {ot.surgeonName}
            </p>
            <p>
              <strong>Assisted:</strong> {ot.staffNames.join(", ")}
            </p>
            {/* <p>
              <strong>Assisted:</strong> {ot.staffNames.join(", ")}
            </p> */}
            <p>
              <strong>Status:</strong> {ot.status || "available"}
            </p>
            <p>
              <strong>Patient allocated:</strong>
              {ot?.patients.length > 0
                ? `${ot.patients[0].patientName} (Priority : ${ot.patients[0].priority})`
                : " No patient allocated"}
            </p>
            <div className="mt-3">
              <h4 className="font-semibold text-gray-800">Patients:</h4>
              {ot.patients.length > 0 ? (
                <ul className="list-disc pl-5">
                  {ot.patients.map((patient, index) => (
                    <li key={index}>
                      <span className="font-medium">{patient.patientName}</span>{" "}
                      -
                      <span
                        className={`ml-2 ${getPriorityClass(patient.priority)}`}
                      >
                        {patient.priority.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No patients allocated.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-600";
    }
  }
};

export default OTList;
