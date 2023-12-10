const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT || 3306
    });

    // Register endpoint
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body;
        console.log('Registering new user:', { username, email, password });

        if (!username || !email || !password) {
            return res.status(400).send('Missing fields');
        }

        try {
            const [existingUsers] = await connection.query(
                'SELECT * FROM user WHERE user_name = ? OR user_mail = ?',
                [username, email]
            );

            if (existingUsers.length > 0) {
                return res.status(409).send('Username or email already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await connection.query(
                'INSERT INTO user (user_name, user_pass, user_mail) VALUES (?, ?, ?)',
                [username, hashedPassword, email]
            );

            console.log('User registered successfully:', username);
            res.status(200).send('User registered successfully');
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Server error');
        }
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        console.log('Login attempt for:', username);

        try {
            const [users] = await connection.query(
                'SELECT user_pass FROM user WHERE user_name = ?',
                [username]
            );

            if (users.length > 0) {
                console.log('User found in database. Comparing passwords...');
                const match = await bcrypt.compare(password, users[0].user_pass);
                console.log('Password match:', match);

                if (match) {
                    res.json({ isAuthenticated: true });
                } else {
                  res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                console.log('No user found with username:', username);
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Server error');
        }
    });

    // Start the server
    const port = 3001;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Handle errors during server start
startServer().catch(err => {
    console.error('Failed to start server:', err);
});
