// AddTodo.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, Checkbox, TextField, Button, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



const AddTodo = ({ onAddTodo }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user_id = localStorage.getItem('user_id');
  const [title, setTitle] = useState('');
  if(isLoggedIn == false){
    window.history.replaceState(null, null, '/');
    setTimeout(() => {
      navigate('/login');
    }, 50); // Delay in milliseconds
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === '') return;

    const newTodo = {
      userId: user_id,
      title: title,
      completed: false,
    };

    try {
      const response = await axios.post('http://localhost:3001/todos', newTodo);
      onAddTodo(response.data);
      setTitle('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
      <div>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="newTodo"
            label="New Todo"
            name="newTodo"
            autoComplete="newTodo"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Add Todo
            </Button>
  </div>

  );
};

export default AddTodo;
