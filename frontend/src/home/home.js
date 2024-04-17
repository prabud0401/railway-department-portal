import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../css/home.css';
import '../css/body.css';
import { validateSearch, handleFromLocationChange, handleToLocationChange } from './validation'; // Import validation functions
import { fetchTrainData } from './TrainService'; // Import fetchTrainData function

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  // State to store the from and to location input values
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  // State to store validation errors
  const [searchErrors, setSearchErrors] = useState({});

  // State to store the fetched train data
  const [availableTrains, setAvailableTrains] = useState([]);

  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Function to handle the search button click
  const handleSearch = async () => {
    // Validate the search input
    const errors = validateSearch(fromLocation, toLocation);

    if (Object.keys(errors).length === 0) {
      try {
        // Fetch train data using the provided function
        const trainData = await fetchTrainData(fromLocation, toLocation);
        setAvailableTrains(trainData.data);
        setShowModal(true);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    } else {
      setSearchErrors(errors);
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
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
                <i className="bx bx-search-alt"></i>
                <input
                  type="text"
                  placeholder="From"
                  value={fromLocation}
                  onChange={(e) => handleFromLocationChange(e, setFromLocation, setSearchErrors, searchErrors)}
                />
                {searchErrors.fromLocation && <p className="error-message">{searchErrors.fromLocation}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="search-2">
                <i className="bx bxs-map"></i>
                <input
                  type="text"
                  placeholder="To"
                  value={toLocation}
                  onChange={(e) => handleToLocationChange(e, setToLocation, setSearchErrors, searchErrors)}
                />
                {searchErrors.toLocation && <p className="error-message">{searchErrors.toLocation}</p>}
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to display available trains */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Available Trains</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableTrains.map((train, index) => (
            <div key={index}>
              <p>{train.name}</p>
              {/* Add more train details as needed */}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
