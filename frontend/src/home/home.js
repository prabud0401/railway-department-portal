import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import '../css/home.css';  // Importing the home.css file
import '../css/body.css';

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Dummy data for available trains
  const availableTrains = [
    { id: 1, name: 'Train A', image: 'train_a.jpg', details: 'Train A details...' },
    { id: 2, name: 'Train B', image: 'train_b.jpg', details: 'Train B details...' },
    // Add more train objects as needed
  ];

  // Function to handle the search button click
  const handleSearch = () => {
    // Perform search logic here
    // For now, just toggle the modal
    setShowModal(true);
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome, {username}!</h1>
        <p>This is the home page of our railway department portal.</p>
      </div>
      <div className="container">
        <div className="search">
          <div className="row">
            <div className="col-md-6">
              <div className="search-1">
                <i className='bx bx-search-alt'></i>
                <input type="text" placeholder="From" />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="search-2">
                  <i className='bx bxs-map' ></i>
                  <input type="text" placeholder="To" />
                  <button onClick={handleSearch}>Search</button> {/* Call handleSearch on button click */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to display available trains */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Available Trains</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Iterate over availableTrains and display train details */}
          {availableTrains.map(train => (
            <div key={train.id} className="train-item">
              <img src={train.image} alt={train.name} className="train-image" />
              <div className="train-details">
                <h2>{train.name}</h2>
                <p>{train.details}</p>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
