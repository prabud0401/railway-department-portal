import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap'; 
import '../css/signup.css'; 
import '../css/body.css'; 
import trainLogo from '../assets/train-logo.png';
import { validateForm } from './validation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    nicOrPassport: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Send a POST request to the signup API
        const response = await axios.post('http://localhost:5000/signup', formData);
        console.log(response.data); // Log the response from the server

        // Show the success modal
        setShowSuccessModal(true);

        // Clear form inputs
        setFormData({
          nicOrPassport: '',
          phoneNumber: '',
          email: '',
          fullName: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  };

  const SuccessModal = () => (
    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your account has been created successfully.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => navigate('/login')}>Go to Login</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <body>
      <div className="wrapper">
        <div className="logo">
          <img src={trainLogo} alt="Train Logo" />
        </div>
        <div className="text-center mt-4 name">
          Railway Department - Sign Up
        </div>
        <Form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-id-card"></span>
            <input 
              type="text" 
              name="nicOrPassport" 
              value={formData.nicOrPassport}
              onChange={handleChange}
              placeholder="NIC or Passport" 
              className="form-control" 
            />
            {errors.nicOrPassport && <div style={{ color: 'red' }}>{errors.nicOrPassport}</div>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-phone"></span>
            <input 
              type="text" 
              name="phoneNumber" 
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number" 
              className="form-control" 
            />
            {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-envelope"></span>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              className="form-control" 
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-user"></span>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name" 
              className="form-control" 
            />
            {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-user"></span>
            <input 
              type="text" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              placeholder="Username" 
              className="form-control" 
            />
            {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              className="form-control" 
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password" 
              className="form-control" 
            />
            {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
          </div>
          <button className="btn mt-3">Sign Up</button>
        </Form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="Login">Sign in</a>
        </div>
      </div>
      <SuccessModal />
    </body>
  );
};

export default Signup;
