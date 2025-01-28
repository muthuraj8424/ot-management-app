import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddPatientForm = () => {
  const { otNumber } = useParams(); // Get OT number from URL
  console.log(otNumber);
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [priority, setPriority] = useState("");
  const [action, setAction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/ots/admittoOT",
        {
          patientName,
          priority,
          otNumber,
          action,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        setPatientName("");
        setPriority("");
        setAction("");
        navigate("/view-ots");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to add patient:", error.message);
      alert("Failed ");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Add Patient to OT No-{otNumber}
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Patient Name:
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Priority:
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Action:
          </label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Action</option>
            <option value="admit">Admit</option>
            <option value="discharge">Discharge</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;
