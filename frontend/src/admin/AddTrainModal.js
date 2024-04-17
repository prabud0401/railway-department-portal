import React, { useState } from 'react';
import axios from 'axios';

const AddTrainModal = ({ setShowAddTrainModal }) => {
    // State variables to store form data
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [firstClassPrice, setFirstClassPrice] = useState('');
    const [secondClassPrice, setSecondClassPrice] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create train object with form data
        const newTrain = {
            name,
            icon,
            fromLocation,
            toLocation,
            departureDate,
            departureTime,
            firstClassPrice,
            secondClassPrice
        };
        try {
            // Send POST request to server to add new train
            const response = await axios.post('http://localhost:5000/train/addNewTrain', newTrain);
            // Handle success
            console.log('Train added successfully:', response.data);
            // Close modal after submission
            setShowAddTrainModal(false);
            // Clear form inputs after submission
            setName('');
            setIcon('');
            setFromLocation('');
            setToLocation('');
            setDepartureDate('');
            setDepartureTime('');
            setFirstClassPrice('');
            setSecondClassPrice('');
        } catch (error) {
            // Handle error
            console.error('Error adding train:', error);
        }
    };

    return (
        <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Train</h5>
                        <button type="button" className="close" onClick={() => setShowAddTrainModal(false)}><span>&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            {/* Add more input fields for other train details */}
                            {/* Example: */}
                            <div className="form-group">
                                <label>From Location:</label>
                                <input type="text" className="form-control" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} />
                            </div>
                            {/* Add more input fields for other train details */}
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTrainModal;
