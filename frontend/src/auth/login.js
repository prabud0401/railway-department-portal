import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap'; 
import '../css/login.css'; 
import '../css/body.css'; 
import trainLogo from '../assets/train-logo.png';
import { validateForm } from './validation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm(username, password);

    if (!isValid) {
      // Form is not valid, return
      return;
    }

    try {
      // Send a POST request to the login API
      const response = await axios.post('http://localhost:5000/login', { username, password });
      console.log(response.data); // Log the response from the server

      // Show the success modal
      setShowSuccessModal(true);

      // Clear input fields
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const SuccessModal = () => (
    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Login successful</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => navigate(`/admin?username=${username}`)}>Go to Home</Button>
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
          Railway Department
        </div>
        <Form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input 
              type="text" 
              name="userName" 
              id="userName" 
              placeholder="Username" 
              className="form-control" 
              value={username} 
              onChange={handleUsernameChange}
              required // Required attribute for HTML5 validation
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input 
              type="password" 
              name="password" 
              id="pwd" 
              placeholder="Password" 
              className="form-control" 
              value={password} 
              onChange={handlePasswordChange}
              minLength={8} // Minimum length attribute for HTML5 validation
              required // Required attribute for HTML5 validation
            />
          </div>
          <button type="submit" className="btn mt-3">Login</button>
        </Form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="Signup">Sign up</a>
        </div>
      </div>
      <SuccessModal />
    </body>
  );
};

export default Login;
