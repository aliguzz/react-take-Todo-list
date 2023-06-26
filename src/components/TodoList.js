// TodoList.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTodo from './AddTodo';




const TodoList = () => {  
  const [todos, setTodos] = useState([]);  
  const navigate = useNavigate(); // Declare the navigate function
  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'false') {
      navigate('/login');
    }
  }, [navigate]); // Include navigate in the dependency array

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos?userId='+user_id);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleToggleCompleted = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      try {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await axios.put(`http://localhost:3001/todos/${id}`, updatedTodo);
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };
  const handleLogout = () => {
    // Perform logout logic here
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('user_id', 0);
    window.history.replaceState(null, null, '/');
    setTimeout(() => {
      navigate('/login');
    }, 50); // Delay in milliseconds
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  

  return (
    <div>
      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <AddTodo onAddTodo={handleAddTodo} />

      <ul className="todo-list">

        {Array.isArray(todos) && todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            {todo.title}
            <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>
              <span className="material-icons">delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
