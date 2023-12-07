const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up lowdb
const adapter = new FileSync('./src/data/credentials.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const userExists = db.get('users').find({ username }).value();
  if (userExists) {
    return res.status(409).send('User already exists');
  }

  // Add user to the database
  db.get('users').push({ username, password, email }).write(); // Remember to hash the password in a real application

  res.status(200).send('User registered successfully');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
