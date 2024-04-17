import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/home.css';
import '../css/body.css';

import Button from 'react-bootstrap/Button';

const Home = () => {
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate();
    

    const fetchTrains = async () => {
        try {
            const response = await axios.get('http://localhost:5000/train');
            setTrains(response.data);
        } catch (error) {
            console.error('Error fetching train data:', error);
        }
    };



    useEffect(() => {
        fetchTrains();
    }, []);

    return (
        <div className="container">
            <div className="text-center my-4">
                <h2>Available Trains</h2>
                <p className="lead">Browse through the list of available trains and book your journey.</p>
            </div>
            <div className="table-wrapper">
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
                                          <Button variant="primary" onClick={() => navigate(`/booking?trainId=${train.id}`)}>Book</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
