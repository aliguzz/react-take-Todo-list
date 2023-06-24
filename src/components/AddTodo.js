// AddTodo.js
import React, { useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Checkbox, TextField, Button, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === '') return;

    const newTodo = {
      userId: 1,
      title: title,
      completed: false,
    };

    try {
      const response = await axios.post('http://localhost:3004/todos', newTodo);
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
  /*  <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button type="submit">Add Todo</button>
    </form>
    */
  );
};

export default AddTodo;
