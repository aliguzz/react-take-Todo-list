import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            setSuccess('');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post('/api/register', { email, password });
            console.log(response.data);
            setSuccess('Registration successful! You will be redirected to login page in 3-5 seconds');
            setErrorMessage('');
            // Redirect to login page after a delay
            setTimeout(() => {
                navigate('/login');
            }, 5000); // Delay in milliseconds     
            // Registration success, redirect to login page or display a success message
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.error);
                setSuccess('');
            } else {
                setErrorMessage('An error occurred during registration');
                setSuccess('');
            }
        }
    };
    return (
        <div className="container">
            <h2>Register</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
