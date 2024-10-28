import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const userData = location.state;
  console.log(userData)
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userData ? (
        <div>
          <h2>Message: {userData.message}</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <img src={userData.picture} alt="User Profile" />
          <p>Token: {userData.token}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Home;
