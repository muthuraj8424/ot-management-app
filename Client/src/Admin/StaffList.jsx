import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StaffCard from './StaffCard';
import StaffUpdateModal from './StaffUpdateModal';
import { Link } from 'react-router-dom';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getAllStaff'); // Update the URL to your backend endpoint
        setStaffData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching staff data');
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  const handleUpdate = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (staffId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/staff/${staffId}`);
      alert(response.data.message)
      setStaffData(staffData.filter((staff) => staff._id !== staffId)); // Remove the staff from the list
    } catch (error) {
      console.error('Error deleting staff:', error.message);
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading staff data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Staff List</h1>
      <Link
  to="/add-staff"
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 m-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
>
  Add New Staff
</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {staffData.map((staff) => (
          <div key={staff._id}>
            <StaffCard staff={staff} onUpdate={handleUpdate} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <StaffUpdateModal
          staff={selectedStaff}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedStaff) => {
            setStaffData(
              staffData.map((staff) =>
                staff._id === updatedStaff._id ? updatedStaff : staff
              )
            );
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default StaffList;
