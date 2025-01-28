import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userRole, setUserRole] = useState(""); // Track user role

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert(response.data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        setIsLoggedIn(false);
        setUserRole("");
        navigate("/");
        
      }
    } catch (error) {
      console.error("Failed to log out:", error.message);
      alert("Error logging out");
    }
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-semibold">
          OT Management
        </Link>

        <div className="space-x-4 flex items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/adminlogin"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
              >
                Admin Login
              </Link>
              <Link
                to="/stafflogin"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
              >
                Staff Login
              </Link>
              <Link
                to="/staffTble"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
              >
                View Staffs
              </Link>
            </>
          ) : (
            <>
              {/* Home link */}
              <Link
                to="/"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
              >
                Home
              </Link>

              {/* Admin specific links */}
              {userRole === "admin" && (
                <>
                  {/* <Link
                    to="/add-staff"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    Add Staff
                  </Link> */}
                  <Link
                    to="/stafflist"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    Manage Staff
                  </Link>
                  <Link
                    to="/manage-ots"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    Manage OTs
                  </Link>
                  {/* <Link
                    to="/add-ot-form"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    Add OTs
                  </Link> */}
                  <Link
                    to="/staffTble"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    View Staffs
                  </Link>
                </>
              )}

              {/* Staff specific links */}
              {userRole === "staff" && (
                <>
                  <Link
                    to="/view-ots"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    View OTs
                  </Link>
                  <Link
                    to="/staffTble"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
                  >
                    View Staffs
                  </Link>
                </>
              )}

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="hover:bg-indigo-500 px-3 py-2 rounded-md transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {/* <Home /> */}
    </nav>
  );
};

export default Navbar;
