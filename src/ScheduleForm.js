import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ScheduleForm() {
  const [formData, setFormData] = useState({
    sender_email: "",
    candidate_name: "",
    role: "",
    sender_position: "",
    start_time: "",
    end_time: "",
    date: "",
    platform: "",
    attendees: "",
    email_preview: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      console.log("Sending data:", formData); // Log the form data being sent

      const response = await fetch("https://ec2-3-106-229-17.ap-southeast-2.compute.amazonaws.com/create_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json", // Specify the expected response type
        },
        credentials: "include", // Include credentials for CORS if needed
        body: new URLSearchParams(formData), // Convert form data to URLSearchParams
      });

      if (response.redirected) {
        // If the response indicates a redirection, handle it here
        console.log("Redirecting to:", response.url);
        window.location.href = response.url; // Redirect to the new URL
      } else if (response.ok) {
        const data = await response.json(); // Assuming the API returns JSON on success
        console.log("Meeting scheduled successfully:", data);
        navigate("/home"); // Redirect to the home page on success
      } else {
        console.error("Failed to schedule meeting:", response.status, response.statusText);
        alert("Error scheduling meeting"); // Display an error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error scheduling meeting"); // Display an error message
    }
  };

  return (
    <div>
      <h2>Schedule a Meeting</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="sender_email"
          placeholder="Sender Email"
          value={formData.sender_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="candidate_name"
          placeholder="Candidate Name"
          value={formData.candidate_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sender_position"
          placeholder="Sender Position"
          value={formData.sender_position}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="start_time"
          placeholder="Start Time"
          value={formData.start_time}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="end_time"
          placeholder="End Time"
          value={formData.end_time}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="platform"
          placeholder="Platform"
          value={formData.platform}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="attendees"
          placeholder="Attendees (comma-separated emails)"
          value={formData.attendees}
          onChange={handleChange}
          required
        />
        <textarea
          name="email_preview"
          placeholder="Email Template Preview"
          value={formData.email_preview}
          onChange={handleChange}
          required
        />
        <button type="submit">Schedule Meeting</button>
      </form>
    </div>
  );
}

export default ScheduleForm;
