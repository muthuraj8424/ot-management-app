import React, { useState } from "react";
import axios from "axios"; // For making API requests
import { useNavigate } from "react-router-dom"; // For navigation

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      console.log(response.data);

      // Extract data from the response
      const { token } = response.data;
      const { username } = response.data;
      const { role } = response.data.user;

      // Store token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      if (response.data.success) {
        alert(response.data.message);
      }
      // Cookies.set('token', token, { expires: 1 / 24 }); // expires in 1 hour
      // Store token in cookies (optional for secure routes)
      // Cookies.set('authToken', token, { expires: 7 }); // Token expires in 7 days

      // Redirect based on the role

      navigate("/");

      // window.location.reload();
      // if (role === "admin") {
      //   navigate("/admin-dashboard");
      // } else if (role === "staff") {
      //   navigate("/staff-dashboard");
      // } else {
      //   throw new Error("Invalid user role");
      // }
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

export default LoginForm;
