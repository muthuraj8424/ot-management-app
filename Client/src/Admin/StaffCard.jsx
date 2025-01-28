import React from 'react';

const StaffCard = ({ staff, onUpdate, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{staff.name}</h2>
        {/* <h2 className="text-xl font-semibold text-gray-800">{staff.name}</h2> */}
        <p className="text-sm text-gray-500">{staff.position}</p>
        <p className="mt-2 text-gray-700"><strong>Staff Id:</strong> {staff._id}</p>
        <p className="mt-2 text-gray-700"><strong>Department:</strong> {staff.department}</p>
        <p className="text-gray-700"><strong>Contact:</strong> {staff.contact}</p>
        <p className="text-gray-700"><strong>Joining Date:</strong> {new Date(staff.joiningDate).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Shift:</strong> {staff.shift}</p>
        <p className="text-gray-700"><strong>Salary:</strong> {staff.salary}</p>
        <div className="mt-4 flex justify-between">
          <button onClick={() => onUpdate(staff)} className="bg-blue-600 text-white p-2 rounded-md">Update</button>
          <button onClick={() => onDelete(staff._id)} className="bg-red-600 text-white p-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
