import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffUpdateModal = ({ staff, onClose, onUpdate }) => {
  const [name, setName] = useState(staff.name);
  const [position, setPosition] = useState(staff.position);
  const [department, setDepartment] = useState(staff.department);
  const [contact, setContact] = useState(staff.contact);
  const [shift, setShift] = useState(staff.shift);
  const [salary, setSalary] = useState(staff.salary);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
   
    try {
      const response = await axios.put(`http://localhost:5000/api/users/staff/${staff._id}`, {
        name,
        position,
        department,
        contact,
        shift,
        salary,
      } ,{
      headers: { Authorization: `Bearer ${token}` }
    });
      onUpdate(response.data); // Update the staff list with the new data
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating staff:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Update Staff</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Name"
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Position"
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Department"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Contact"
        />
        <input
          type="text"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Shift"
        />
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          placeholder="Salary"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded-md">Cancel</button>
          <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 rounded-md">Update</button>
        </div>
      </div>
    </div>
  );
};

export default StaffUpdateModal;
