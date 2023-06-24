import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';

const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addTodo(title);
        setTitle('');
    };

    return (
        <Paper style={{ margin: 16, padding: 16 }}>
            <Grid container>
                <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                    <TextField
                        placeholder="Add Todo..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
                        InputProps={{
                            style: { fontSize: "1.3rem" },
                        }}
                    />
                </Grid>
                <Grid xs={2} md={1} item>
                    <Button
                        color="secondary"
                        variant="outlined"
                        onClick={onSubmit}
                        style={{ height: '100%' }}
                    >
                        <Add />
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AddTodo;
