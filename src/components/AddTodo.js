// AddTodo.js
import React, { useState } from 'react';
import axios from 'axios';



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
      const response = await axios.post('https://mockend.com/api/aliguzz/react-take-Todo-list/todos?_key=Gn5476Bxyy', newTodo);
      onAddTodo(response.data);
      setTitle('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
