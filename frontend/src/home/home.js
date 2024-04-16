import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  // Extracting the username from the URL parameter
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const username = params.get('username');

  return (
    <div>
      <h1>Welcome to the Home Page, {username}!</h1>
      <p>This is a simple example of a home page component.</p>
    </div>
  );
};

export default Home;
