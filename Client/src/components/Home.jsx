import React from 'react';
// import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-6">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">Welcome to the Hospital Management System</h1>
        <p className="text-lg text-gray-700 mb-6">
          Streamlining the management of Operation Theatres, Patients, and Staff.
        </p>

        {/* Hospital System Overview */}
        <div className="mt-12 bg-indigo-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">About the System</h2>
          <p className="text-lg text-gray-700">
            This hospital management system is designed to provide seamless operation theatre management, 
            patient handling, and staff coordination. It helps in real-time tracking of patient priorities 
            and theatre availability, making the workflow more efficient and streamlined.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
