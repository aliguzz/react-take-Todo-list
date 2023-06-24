// TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';



const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
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
        await axios.put(`api/todos/${id}`, updatedTodo);
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <AddTodo onAddTodo={handleAddTodo} />

      <ul>
          
        {Array.isArray(todos) && todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
