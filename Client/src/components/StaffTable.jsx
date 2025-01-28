// src/components/StaffTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/staffTable");
        console.log(response.data);
        setStaff(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching staff data");
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Staff List</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">shift</th>
            <th className="py-2 px-4 border-b">Staff id</th>
           
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember._id}>
              <td className="py-2 px-4 border-b">{staffMember.name}</td>
              <td className="py-2 px-4 border-b">{staffMember.position}</td>
              <td className="py-2 px-4 border-b">{staffMember.department}</td>
              <td className="py-2 px-4 border-b">{staffMember.shift}</td>
              <td className="py-2 px-4 border-b">{staffMember._id}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
