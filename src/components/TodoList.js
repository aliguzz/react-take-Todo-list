import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, ListItem, ListItemText, List } from '@mui/material';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Replace the URL below with your mockend.com URL
            const result = await axios('https://mockend.com/aliguzz/react-take-Todo-list/todos');
            setTodos(result.data);
        };
        fetchData();
    }, []);

    const toggleTodo = id => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <List>
            {todos.map(todo => (
                <ListItem key={todo.id} dense button onClick={() => toggleTodo(todo.id)}>
                    <Checkbox
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                    />
                    <ListItemText
                        primary={todo.title}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default TodoList;
