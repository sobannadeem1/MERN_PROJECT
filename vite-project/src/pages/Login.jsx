import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/context"; // Adjust the path as necessary
// import "./Login.css";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [user, setUser] = useState({
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
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res = await response.json();
      if (response.ok) {
        generatetoken(res.token); // Call the generateToken function directly
        navigate("/");
        toast.success("login successfullss");
      } else {
        toast.error(res.extradetails || res.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login Form</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} method="POST">
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
