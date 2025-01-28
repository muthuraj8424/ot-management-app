import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageOTs = () => {
  const [ots, setOts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ots"); // Replace with your backend API
        setOts(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (err) {
        setError("Error fetching operation theatres");
        setLoading(false);
      }
    };

    fetchOts();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);

    if (!window.confirm("Are you sure you want to delete this OT?")) return;
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/ots/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOts(ots.filter((ot) => ot._id !== id));
      alert("OT deleted successfully");
    } catch (err) {
      console.error("Error deleting OT:", err);
      alert("Failed to delete OT");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-700">Loading operation theatres...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Manage Operation Theatres
      </h1>
      <Link
        to="/add-ot-form"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Add OT's
      </Link>

      {ots.length === 0 ? (
        <p className="text-center text-gray-700">
          No operation theatres available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {ots.map((ot) => (
            <div
              key={ot._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {ot.otName}
              </h2>
              <p className="text-sm text-gray-500">OT Number: {ot.otNumber}</p>
              <p className="mt-2 text-gray-700">
                <strong>Status:</strong> {ot.status}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Equipment:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {ot.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-2 text-gray-700">
                <strong>Surgeon:</strong> {ot.surgeonName}
              </p>
              {/* <p className="mt-2 text-gray-700">
                <strong>Staff:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {ot.staff.map((member) => (
                  <li key={member._id}>{member.name}</li>
                ))}
              </ul> */}
              <p className="mt-2 text-gray-700">
                <strong>Assited :</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {ot.staffNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
              <p className="mt-2 text-gray-500 text-sm">
                Created At: {new Date(ot.createdAt).toLocaleString()}
              </p>
              {/* <p className="text-gray-500 text-sm">
                Updated At: {new Date(ot.updatedAt).toLocaleString()}
              </p> */}
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => navigate(`/update-ot/${ot._id}`)}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => handleDelete(ot._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOTs;
