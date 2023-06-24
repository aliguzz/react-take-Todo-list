import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Container, CssBaseline } from '@mui/material';

import './App.css';

function App() {
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

    return (
      <Container component="main" maxWidth="md">
      <CssBaseline />
      <TodoList />
      </Container>
    );
}

export default App;
