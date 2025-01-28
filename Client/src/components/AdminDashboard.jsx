import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate(); 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Manage Staff */}
        <button
          className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => navigate('/manage-staff')} 
        >
          Manage Staff
        </button>

        {/* Manage OTs */}
        <button
          className="p-4 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
          onClick={() => navigate('/manage-ots')}
        >
          Manage OTs
        </button>

        {/* Add OTs */}
        <button
          className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={() => navigate('/add-ot-form')} 
        >
          Add OTs
        </button>

        {/* Staff List */}
        <button
          className="p-4 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
          onClick={() => navigate('/stafflist')} 
        >
          Staff List
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
