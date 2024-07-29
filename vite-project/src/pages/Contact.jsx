import React, { useState, useEffect } from "react";
import "./ContactForm.css";
import { useAuth } from "../store/context";

const ContactForm = () => {
  const { users } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Use useEffect to update user state when users context changes
  useEffect(() => {
    if (users) {
      setUser({
        name: users.name,
        email: users.email,
        message: "",
      });
    }
  }, [users]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      alert("Data saved into database 😉");
      setUser({
        name: "",
        email: "",
        message: "",
      });
      console.log(data);
    }
  };

  return (
    <div className="contact-container">
      <div className="form-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              value={user.name}
              autoComplete="off"
              onChange={handleInput}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              required
              value={user.email}
              autoComplete="off"
              onChange={handleInput}
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              id="message"
              autoComplete="off"
              required
              value={user.message}
              onChange={handleInput}
            ></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
