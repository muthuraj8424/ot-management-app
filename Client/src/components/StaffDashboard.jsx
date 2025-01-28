import React from 'react';
import OtLIst from '../Staff/OTlist';

const StaffDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Staff Dashboard</h2>
      {/* List of OTs */}
      <OtLIst />
    </div>
  );
};

export default StaffDashboard;
