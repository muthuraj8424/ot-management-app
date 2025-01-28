import React, { useState } from "react";
import axios from "axios"; // For making API requests
import { useNavigate } from "react-router-dom"; // For navigation

const StaffLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/stafflogin",
        { email, password }
      );
 
      // Extract data from the response
      const { token } = response.data;
      const {user} = response.data
      console.log(user);
      
      const { role } = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);


      if (response.data.success) {
        alert(response.data.message)
      }
      navigate("/")

      window.location.reload()

    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLoginForm;
