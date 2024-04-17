import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateTrain = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('trainId');

    const [train, setTrain] = useState({
        name: '',
        icon: '',
        from_location: '',
        to_location: '',
        departure_date: '',
        departure_time: '',
        first_class_price: '',
        second_class_price: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        const fetchTrain = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/train/searchID/${id}`);
                setTrain(response.data);
            } catch (error) {
                console.error('Error fetching train data:', error);
            }
        };

        fetchTrain();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrain(prevTrain => ({
            ...prevTrain,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/train/update/${id}`, train);
            setSuccessMessage('Train updated successfully');
            setShowModal(true);
            // Automatically close the modal after 3 seconds
            setTimeout(() => {
                setShowModal(false);
                setSuccessMessage('');
                // Redirect to the main page (admin)
                navigate('/admin');
            }, 3000);
        } catch (error) {
            console.error('Error updating train:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSuccessMessage('');
    };
    return (
        <section className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#2779e2' }}>
            <div className="container">
                <div className="card shadow p-5">
                    <h1 className="text-center mb-4">Edit Train</h1>
                    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" value={train.name} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="icon" className="form-label">Icon</label>
        <input type="text" className="form-control" id="icon" name="icon" value={train.icon} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="from_location" className="form-label">From Location</label>
        <input type="text" className="form-control" id="from_location" name="from_location" value={train.from_location} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="to_location" className="form-label">To Location</label>
        <input type="text" className="form-control" id="to_location" name="to_location" value={train.to_location} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="departure_date" className="form-label">Departure Date</label>
        <input type="date" className="form-control" id="departure_date" name="departure_date" value={train.departure_date} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="departure_time" className="form-label">Departure Time</label>
        <input type="text" className="form-control" id="departure_time" name="departure_time" value={train.departure_time} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="first_class_price" className="form-label">First Class Price</label>
        <input type="text" className="form-control" id="first_class_price" name="first_class_price" value={train.first_class_price} onChange={handleChange} />
    </div>
    <div className="mb-3">
        <label htmlFor="second_class_price" className="form-label">Second Class Price</label>
        <input type="text" className="form-control" id="second_class_price" name="second_class_price" value={train.second_class_price} onChange={handleChange} />
    </div>
    <div className="text-center">
        <button type="submit" className="btn btn-primary btn-lg">Update Train</button>
    </div>
</form>

                </div>
            </div>
            {/* Success modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{successMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UpdateTrain;