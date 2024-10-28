import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';  // Import the Home component
import RedirectToHome from './RedirectToHome';  // Import the RedirectToHome component
import ScheduleForm from './ScheduleForm'; // Import the ScheduleForm component
import MeetingScheduler from "./MeetingScheduler";

// Google login component
function App() {
  const initiateGoogleLogin = () => {
    // Trigger the backend API for Google login
    window.location.href = 'https://ec2-3-106-229-17.ap-southeast-2.compute.amazonaws.com/login_google';
  };

  return (
    <div className="App">
      <h1>Google Login Demo</h1>
      <button onClick={initiateGoogleLogin}>Login with Google</button>
    </div>
  );
}

// AppWrapper where all routes are handled
export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Main Google login page */}
        <Route path="/home" element={<Home />} /> {/* Home page after redirect */}
        <Route path="/redirect" element={<RedirectToHome />} /> {/* Redirect page to handle backend redirect */}
        <Route path="/schedule" element={<ScheduleForm />} /> {/* Route for the Schedule Form */}
      
      </Routes>
    </Router>
  );
}

