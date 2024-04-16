import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import '../css/home.css'; // Importing the home.css file
import '../css/body.css';
import { validateSearch, handleFromLocationChange, handleToLocationChange } from './validation'; // Import functions from validation.js
import { fetchTrainIDs, fetchTrainDetails } from './TrainService'; // Import fetchTrains function from TrainService.js

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username');

  // State to store the from and to location input values
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  // State to store validation errors
  const [searchErrors, setSearchErrors] = useState({});
  
  // State to store available trains
  const [availableTrains, setAvailableTrains] = useState([]);
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // State to store search message
  const [searchMessage, setSearchMessage] = useState('');

    // Function to handle the search button click
const handleSearch = async () => {
  // Validate the search input
  const errors = validateSearch(fromLocation, toLocation);

  // If there are no errors, proceed with fetching trains
  if (Object.keys(errors).length === 0) {
      try {
          // Fetch train IDs based on fromLocation and toLocation using TrainService
          const trainIDs = await fetchTrainIDs(fromLocation, toLocation);

          // Fetch train details for each train ID
          const trainDetails = await Promise.all(trainIDs.map(async (id) => {
              try {
                  // Fetch train details using TrainService
                  const trainDetail = await fetchTrainDetails(id);
                  return trainDetail;
              } catch (error) {
                  console.error(`Error fetching train details for train ID ${id}:`, error);
                  throw error; // Throw the error to be caught by the outer catch block
              }
          }));

          // Once all train details are fetched, update the state or perform any necessary action
          console.log('Fetched train details:', trainDetails);
      } catch (error) {
          console.error('Error fetching train IDs:', error);
          // If there are errors, update the searchErrors state
          setSearchErrors({ message: 'Error fetching train IDs' });
      }
  } else {
      // If there are errors, update the searchErrors state
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
                  onChange={(e) => handleFromLocationChange(e, setFromLocation, setSearchErrors, searchErrors)} // Update fromLocation state
                />
                {searchErrors.fromLocation && <p className="error-message">{searchErrors.fromLocation}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="search-2">
                  <i className="bx bxs-map"></i>
                  <input
                    type="text"
                    placeholder="To"
                    value={toLocation}
                    onChange={(e) => handleToLocationChange(e, setToLocation, setSearchErrors, searchErrors)} // Update toLocation state
                  />
                  {searchErrors.toLocation && <p className="error-message">{searchErrors.toLocation}</p>}
                  <button onClick={handleSearch}>Search</button> {/* Call handleSearch on button click */}
                </div>
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
          {/* Render the available trains here */}
          {availableTrains.length > 0 ? (
            <div>
              {availableTrains.map((train, index) => (
                <div key={index}>
                  {/* Display train details */}
                  <p>{train.name}</p>
                  {/* Add more train details as needed */}
                </div>
              ))}
            </div>
          ) : (
            <p>{searchMessage}</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
