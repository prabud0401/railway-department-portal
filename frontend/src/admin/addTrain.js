import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../css/addTrain.css';

const AddTrain = () => {
    // State variables to store form data and modal visibility
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [firstClassPrice, setFirstClassPrice] = useState('');
    const [secondClassPrice, setSecondClassPrice] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate(); // Get the navigate object for redirection

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
            await axios.post('http://localhost:5000/train/addTrain', newTrain);
            // Handle success by showing the success modal
            setShowSuccessModal(true);
            // Clear form inputs after submission
            clearForm();
        } catch (error) {
            // Handle error
            console.error('Error adding train:', error);
        }
    };

    // Function to clear form inputs
    const clearForm = () => {
        setName('');
        setIcon('');
        setFromLocation('');
        setToLocation('');
        setDepartureDate('');
        setDepartureTime('');
        setFirstClassPrice('');
        setSecondClassPrice('');
    };

    // Function to close the success modal and redirect to the main admin page
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        // Redirect to the main admin page
        navigate('/admin');
    };

    return (
        <section className="vh-100 bg-image" >
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: '15px'}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Add New Train</h2>


                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" placeholder="Icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" placeholder="From Location" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" placeholder="To Location" value={toLocation} onChange={(e) => setToLocation(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="date" className="form-control form-control-lg" placeholder="Departure Date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="time" className="form-control form-control-lg" placeholder="Departure Time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="number" className="form-control form-control-lg" placeholder="First Class Price" value={firstClassPrice} onChange={(e) => setFirstClassPrice(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="number" className="form-control form-control-lg" placeholder="Second Class Price" value={secondClassPrice} onChange={(e) => setSecondClassPrice(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Submit</button>
                                    </form>

{/* Success modal */}
{showSuccessModal && (
    <div className="modal fade show" id="successModal" tabIndex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="successModalLabel">Success</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Train added successfully!
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        </div>
    </div>
)}
</div>
</div>
</div>
</div>
</div>
</div>
</section>
);
};

export default AddTrain;