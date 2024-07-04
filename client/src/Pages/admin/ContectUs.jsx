import React, { useState } from "react";
import Dashboard from "./Dashboard";
import "./css/contect.css";
function ContectUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the backend)
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <Dashboard title={"Contect-Us"}>
      <div className="contact-page">
        <h1>Contact Us</h1>
        <div className="contact-info">
          <p>
            Have a question or want to reach out? We'd love to hear from you!
          </p>
          <p>Email: info@foodtruck.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default ContectUs;
