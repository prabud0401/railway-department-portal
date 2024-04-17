import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/body.css';
import '../css/admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from 'react-bootstrap/Button';


const TrainManagement = () => {
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleEditClick = (trainId) => {
        navigate(`/updateTrain?trainId=${trainId}`);
    };

    const fetchTrains = async () => {
        try {
            const response = await axios.get('http://localhost:5000/train');
            setTrains(response.data);
        } catch (error) {
            console.error('Error fetching train data:', error);
        }
    };

    const handleDeleteClick = async (trainId) => {
        if (window.confirm('Are you sure you want to delete this train?')) {
            try {
                await axios.delete(`http://localhost:5000/train/delete/${trainId}`);
                fetchTrains();
            } catch (error) {
                console.error('Error deleting train:', error);
            }
        }
    };

    useEffect(() => {
        fetchTrains();
    }, []);

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage <b>Trains</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/addTrain" className="btn btn-success"><span>Add New Train</span></Link>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Icon</th>
                            <th>From Location</th>
                            <th>To Location</th>
                            <th>Departure Date</th>
                            <th>Departure Time</th>
                            <th>First Class Price</th>
                            <th>Second Class Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trains.map(train => (
                            <tr key={train.id}>
                                <td>{train.id}</td>
                                <td>{train.name}</td>
                                <td>{train.icon}</td>
                                <td>{train.from_location}</td>
                                <td>{train.to_location}</td>
                                <td>{train.departure_date}</td>
                                <td>{train.departure_time}</td>
                                <td>{train.first_class_price}</td>
                                <td>{train.second_class_price}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleEditClick(train.id)}>Update</Button>
                                    <Button variant="danger" onClick={() => handleDeleteClick(train.id)}>Delete</Button> {/* Add delete button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainManagement;
