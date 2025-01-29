import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddOTForm = () => {
  const [otName, setOtName] = useState("");
  const [otNumber, setOtNumber] = useState("");
  const [equipment, setEquipment] = useState("");
  const [surgeonName, setSurgeonName] = useState("");
  const [surgeon, setSurgeonId] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffIds, setStaffIds] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/ots/add",
        {
          otName,
          otNumber,
          equipment: equipment.split(","),
          surgeon,
          surgeonName,
          staffNames: staffName.split(","),
          staffIds: staffIds.split(","),
          status: "available",
          patients: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate('/add-ot-form')
      }
    } catch (error) {
      console.error("Failed to add OT:", error.message);
      alert("Error adding OT");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Add OT Details
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        {/* OT Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            OT Name:
          </label>
          <input
            type="text"
            value={otName}
            onChange={(e) => setOtName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* OT Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            OT Number:
          </label>
          <input
            type="text"
            value={otNumber}
            onChange={(e) => setOtNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Equipment */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Equipment (comma-separated):
          </label>
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Surgeon Name and ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Surgeon Name:
          </label>
          <input
            type="text"
            value={surgeonName}
            onChange={(e) => setSurgeonName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Surgeon ID:
          </label>
          <input
            type="text"
            value={surgeon}
            onChange={(e) => setSurgeonId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {/* Staff Name and IDs */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Staff Name:
          </label>
          <input
            type="text"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Staff IDs (comma-separated):
          </label>
          <input
            type="text"
            value={staffIds}
            onChange={(e) => setStaffIds(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add OT
        </button>
      </form>
    </div>
  );
};

export default AddOTForm;
