import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateOT = () => {
  const [otDetails, setOtDetails] = useState({
    otName: "",
    otNumber: "",
    equipment: [],
    surgeonName: "",
    staffNames: [],
    status: "",
  });
  const { otId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch OT details when the component loads
    const fetchOTDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ots/${otId}`
        );
        console.log(response.data);

        setOtDetails(response.data);
      } catch (error) {
        console.error("Error fetching OT details:", error);
      }
    };

    fetchOTDetails();
  }, [otId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure staffNames, equipment, and staff are arrays and split any string entries
    let staffNamesArray = otDetails.staffNames;
    let equipmentArray = otDetails.equipment;
    let staffArray = otDetails.staff;

    // If any entry in staffNames is a string, split it into individual names
    staffNamesArray = staffNamesArray.flatMap((name) => {
      if (typeof name === "string") {
        return name
          .split(",")
          .map((n) => n.trim()) // Trim spaces
          .filter((n) => n !== ""); // Remove empty names
      }
      return name;
    });

    // If any entry in equipment is a string, split it into individual equipment
    equipmentArray = equipmentArray.flatMap((item) => {
      if (typeof item === "string") {
        return item
          .split(",")
          .map((n) => n.trim()) // Trim spaces
          .filter((n) => n !== ""); // Remove empty equipment
      }
      return item;
    });

    // If any entry in staff is a string, split it into individual staff members
    staffArray = staffArray.flatMap((staff) => {
      if (typeof staff === "string") {
        return staff
          .split(",")
          .map((n) => n.trim()) // Trim spaces
          .filter((n) => n !== ""); // Remove empty staff names
      }
      return staff;
    });

    // Now we have all arrays properly formatted
    const updatedOTDetails = {
      ...otDetails,
      staffNames: staffNamesArray, // Update the staffNames field
      equipment: equipmentArray, // Update the equipment field
      staff: staffArray, // Update the staff field
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/ots/${otId}`,
        updatedOTDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
      }
      navigate("/manage-ots"); // Redirect to OT management page
    } catch (error) {
      console.error("Failed to update OT:", error.message);
      alert("Error updating OT");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Update OT</h2>
      <form onSubmit={handleSubmit}>
        {/* OT Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            OT Name:
          </label>
          <input
            type="text"
            name="otName"
            value={otDetails.otName}
            onChange={handleChange}
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
            name="otNumber"
            value={otDetails.otNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Equipment */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Equipment:
          </label>
          <input
            type="text"
            name="equipment"
            value={otDetails.equipment.join(", ")}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "equipment",
                  value: e.target.value.split(", "),
                },
              })
            }
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Surgeon Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Surgeon Name:
          </label>
          <input
            type="text"
            name="surgeonName"
            value={otDetails.surgeonName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Staff Names */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Staff Names:
          </label>
          <input
            type="text"
            name="staffNames"
            value={otDetails.staffNames.join(", ")}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "staffNames",
                  value: e.target.value.split(", "),
                },
              })
            }
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Status:
          </label>
          <select
            name="status"
            value={otDetails.status}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
        >
          Update OT
        </button>
      </form>
    </div>
  );
};

export default UpdateOT;
