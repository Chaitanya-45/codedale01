import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const REACT_APP_API_BASE_URL = "https://dotform-backend.onrender.com";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(`${REACT_APP_API_BASE_URL}/api/auth/signup`, { username, email, password });
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container fluid className="min-h-screen bg-[#FFF8F8] flex items-center justify-center p-4">
      <Row className="justify-content-md-center w-100">
        <Col xs={12} md={6} className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="space-y-6">
            <Form.Group controlId="formUsername">
              <Form.Label className="text-gray-700 font-medium">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE6059] focus:border-transparent"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label className="text-gray-700 font-medium">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE6059] focus:border-transparent"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label className="text-gray-700 font-medium">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FE6059] focus:border-transparent"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE6059]"
            >
              Register
            </Button>
          </Form>
          <div className="mt-6 text-center">
            <Link to="/login" className="font-medium text-[#FE6059] hover:text-red-600">
              Already have an account? Login here
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
