import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { Container, CssBaseline } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    let isLoggedIn = localStorage.setItem('isLoggedIn', 'false');
    let user_id = 0;
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

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
            const response = await axios.post('/api/login', { email, password });
            console.log(response.data);
            if (response.status === 401 || response.status === 400 || response.status === 500) {
                setErrorMessage('Invalid credentials or the user you entered does not exist.');
            } else {
                //setIsLoggedIn(true);
                isLoggedIn = localStorage.setItem('isLoggedIn', 'true');
                user_id = localStorage.setItem('user_id', response.data.user_id);
                //alert();
                setTimeout(() => {
                    navigate('/');
                }, 50); // Delay in milliseconds 
            }
            // Handle successful login
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid credentials or the user you entered does not exist.');
            // Handle login error
        }
    };

    return isLoggedIn ? (
        <div>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <TodoList />
          </Container>
        </div>
      ) : (
        <div className="container">
            <h2>Login</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <hr />
            <br />
            <button className="btn custom-button">
                <Link className="btn custom-button" to="/register">Register</Link>
            </button>
        </div>
    );
};

export default Login;
