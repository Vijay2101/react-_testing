import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const picture = urlParams.get('picture');
    const token = urlParams.get('token');

    // Create a JSON object with the data
    const userData = {
      message: message,
      name: name,
      email: email,
      picture: picture,
      token: token
    };

    // console.log('Extracted User Data:', userData);

    // Redirect to the home page with the userData object as state
    setTimeout(() => {
      navigate('/home', { state: userData });  // Passing userData as state
    }, 2000);
  }, [navigate]);

  return (
    <div>
      <h1>Authentication Successful</h1>
      <p>Redirecting to the home page...</p>
    </div>
  );
};

export default RedirectToHome;

