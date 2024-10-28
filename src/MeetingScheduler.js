import React, { useEffect, useState } from "react";
import axios from "axios";

function MeetingScheduler() {
  const [queryParams, setQueryParams] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Extract query parameters from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      candidate_name: params.get("candidate_name") || "",
      sender_name: params.get("sender_name") || "",
      sender_position: params.get("sender_position") || "",
      role: params.get("role") || "",
      company: params.get("company") || "",
      start_time: params.get("start_time") || "",
      end_time: params.get("end_time") || "",
      zoom_date_time: params.get("zoom_date_time") || "",
      date: params.get("date") || "",
      sender_email: params.get("sender_email") || "",
      attendees: params.get("attendees") || "",
      template: params.get("template") || "",
    };
  };

  useEffect(() => {
    setQueryParams(getQueryParams());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ec2-3-106-229-17.ap-southeast-2.compute.amazonaws.com/create_meeting2",
        queryParams
      );
      setResponse(res.data);
    } catch (err) {
      setError("Failed to create meeting: " + err.message);
    }
  };

  const handleChange = (e) => {
    setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h1>Meeting Scheduler</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(queryParams).map((key) => (
          <div key={key} style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {key.replace("_", " ").toUpperCase()}:
            </label>
            <input
              type="text"
              name={key}
              value={queryParams[key]}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: "10px 20px", border: "none", backgroundColor: "#007bff", color: "white", borderRadius: "4px", cursor: "pointer" }}>
          Schedule Meeting
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#e0ffe0", border: "1px solid #00b300", borderRadius: "4px" }}>
          <h2>Meeting Created Successfully!</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default MeetingScheduler;
