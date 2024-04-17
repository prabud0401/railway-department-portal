import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const trainId = params.get('trainId');

    const [train, setTrain] = useState({});
    const [bookingDetails, setBookingDetails] = useState({
        fullName: '',
        nicOrPassport: '',
        contactNumber: '',
        email: '',
        classType: '',
        numberOfSeats: 1 
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
const [successMessage, setSuccessMessage] = useState('');

const SuccessModal = () => {
    return (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Success</h5>
                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{successMessage}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/train/searchID/${trainId}`);
                setTrain(response.data);
            } catch (error) {
                console.error('Error fetching train data:', error);
            }
        };

        fetchTrainDetails();
    }, [trainId]);

    const handleBookingDetailsChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!bookingDetails.fullName || !bookingDetails.nicOrPassport || !bookingDetails.contactNumber || !bookingDetails.email || !bookingDetails.classType || !bookingDetails.numberOfSeats) {
            setError('Please fill in all fields');
            return;
        }

        if (bookingDetails.numberOfSeats > 5) {
            setError('Maximum 5 seats can be booked');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/booking/book', {
                trainId: train.id,
                fullName: bookingDetails.fullName,
                nicOrPassport: bookingDetails.nicOrPassport,
                contactNumber: bookingDetails.contactNumber,
                email: bookingDetails.email,
                classType: bookingDetails.classType,
                numberOfSeats: bookingDetails.numberOfSeats
            });

            const { booking_id } = response.data;
        setSuccessMessage(`Booking successful. Your booking ID is ${booking_id}`);
        setShowModal(true);
        } catch (error) {
            console.error('Error submitting booking:', error);
            setError('An error occurred while processing your booking. Please try again later.');
        }
    };

    return (
        <section className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#2779e2' }}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="train-details">
                            <h2>Train Details</h2>
                            <p>Name: {train.name}</p>
                            <p>From Location: {train.from_location}</p>
                            <p>To Location: {train.to_location}</p>
                            <p>Departure Date: {train.departure_date}</p>
                            <p>Departure Time: {train.departure_time}</p>
                            <p>First Class Price: {train.first_class_price}</p>
                            <p>Second Class Price: {train.second_class_price}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="booking-form">
                            <h2>Booking Form</h2>
                            <form onSubmit={handleBookingSubmit}>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="fullName" name="fullName" value={bookingDetails.fullName} onChange={handleBookingDetailsChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nicOrPassport" className="form-label">NIC or Passport</label>
                                    <input type="text" className="form-control" id="nicOrPassport" name="nicOrPassport" value={bookingDetails.nicOrPassport} onChange={handleBookingDetailsChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                    <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={bookingDetails.contactNumber} onChange={handleBookingDetailsChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={bookingDetails.email} onChange={handleBookingDetailsChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="classType" className="form-label">Class Type</label>
                                    <select className="form-select" id="classType" name="classType" value={bookingDetails.classType} onChange={handleBookingDetailsChange}>
                                        <option value="">Select Class Type</option>
                                        <option value="1stClass">1st Class</option>
                                        <option value="2ndClass">2nd Class</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numberOfSeats" className="form-label">Number of Seats</label>
                                    <input type="number" className="form-control" id="numberOfSeats" name="numberOfSeats" value={bookingDetails.numberOfSeats} onChange={handleBookingDetailsChange} />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Book Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal />
        </section>
    );
};

export default Booking;
