import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:'staff'
  });
  const navigate = useNavigate()

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Simple client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      if (response.data.success) {
        alert(response.data.message);
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
            // role:'staff'
        });
        navigate('/stafflogin')
      }
    } catch (error) {
      setError("Registration failed. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-semibold">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value="staff" // The role is set to 'staff'
            className="w-full p-3 border rounded-md mt-1 bg-gray-200 text-gray-600"
            readOnly // Makes the field non-editable
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-3 rounded-md ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
