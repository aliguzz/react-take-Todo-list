import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Container, CssBaseline } from '@mui/material';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {    
  const [isLoggedIn, setIsLoggedIn] = localStorage.getItem('isLoggedIn');

  
    
    const [todos, setTodos] = useState([]);

    const addTodo = title => {
        const newTodo = {
            userId: 1,
            id: todos.length + 1,
            title,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };
    //alert(isLoggedIn);
//<Route
//path="/login"
//element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
///>
    return (
        <Router>
        <Routes>
        
          <Route
            path="/"
            element={isLoggedIn ? (
                
              <Container component="main" maxWidth="md">
                <CssBaseline />
                <TodoList />
              </Container>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
 
    );
}

export default App;
