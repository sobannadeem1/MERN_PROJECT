import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/context"; // Adjust the path as necessary
import "./Register.css";

const RegistrationForm = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const { generatetoken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res = await response.json();
      if (response.ok) {
        generatetoken(res.token); // Call the generateToken function directly
        navigate("/login");
        toast.success("registration successful");
      } else {
        toast.error(res.extradetails || res.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Registration Form</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={handleSubmit} method="POST">
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              value={user.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              autoComplete="off"
              value={user.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="off"
              value={user.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="off"
              value={user.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Register Now</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
