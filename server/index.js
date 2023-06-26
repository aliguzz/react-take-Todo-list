const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3001;
const users = [
    {
        email: 'user1@example.com',
        password: '$2a$10$nhpXULU/Ahk.FLAp9d2x8O5Q7iSMke.HplEZ.u3Wb/QD1XmN83up6', // Example hashed password
    },
    // Add more user objects as needed
];

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';

// Mock database using file system
const dbPath = './db.json';
let db = { users: [], todos: [] };
// Define the todos array outside the route handler


if (fs.existsSync(dbPath)) {
    db = JSON.parse(fs.readFileSync(dbPath));
}

// Register new user
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    // Check if the email already exists in the users array
    const existingUser = db.users.find((user) => user.email === email);

    // If the email already exists, return an error response
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // Generate a new userId by incrementing the last userId in the users array
    const lastUserId = db.users.length > 0 ? db.users[db.users.length - 1].userId : 0;
    const userId = lastUserId + 1;

    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a new user object with email, password, and isLoggedIn
    const newUser = {
        userId,
        email,
        password: hashedPassword,
        isLoggedIn: false
    };

    db.users.push(newUser);

    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.json({ success: true });
});



// Login user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    try {

        // Check if email and password are provided
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Find the user by email
        const user = db.users.find((user) => user.email === email);
        //const user = users.find((user) => user.email === email);

        if (!user || !password || !user.password || !bcrypt.compareSync(password, user.password)) {
            // Incorrect credentials or missing password, return error response
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        // If login is successful
        res.status(200).json({ user_id: user.userId });
    } catch (error) {
        // Handle errors
        console.error('Login error:', error);
        res.status(400).json({ error: error.message });
    }

    const token = jwt.sign({ email }, SECRET_KEY, {
        expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ token });
});

// Add more endpoints for todos (GET, POST, DELETE, etc.)
//let todos = require('../db.json');
//let todos = [];
// POST request to add a new todo
app.post('/todos', (req, res) => {
    const { userId, title, completed } = req.body;
    // Parse userId as an integer
    let parsedUserId = parseInt(userId);
    // Retrieve the last ID from the todos array
    
    
    const lastId = db.todos.length > 0 ? db.todos[db.todos.length - 1].id :0;

    // Increment the last ID by 1 to generate a new ID
    const newId = lastId + 1;

    // Create the new todo object with the new ID
    const newTodo = {
        id: newId,
        userId: parsedUserId,
        title,
        completed,
    };

    // Add the new todo to the todos array
    db.todos.push(newTodo);
    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.status(200).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { completed } = req.body;
  
    // Find the todo with the given id in the todos array
    const todoIndex = db.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
      // Update the completed field of the todo
      db.todos[todoIndex].completed = completed;
      fs.writeFileSync(dbPath, JSON.stringify(db));
      res.json({ message: 'Todo updated successfully' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
    
  });
  

  app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
  
    const todoIndex = db.todos.findIndex(todo => todo.id === todoId);
  
    if (todoIndex !== -1) {
      // Remove the todo from the todos array
      db.todos.splice(todoIndex, 1);
  
      // Write the updated data back to the JSON file
      //const filePath = path.join(__dirname, 'db.json');
      fs.writeFileSync(dbPath, JSON.stringify(db));
  
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

