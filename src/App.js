import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Container, Typography, Paper } from '@mui/material';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = title => {
        const newTodo = {
            id: todos.length + 1,
            title,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ margin: 16, padding: 16 }}>
                <Typography variant="h4" align="center">
                    Todo App
                </Typography>
                <AddTodo addTodo={addTodo} />
                <TodoList todos={todos} setTodos={setTodos} />
            </Paper>
        </Container>
    );
}

export default App;
