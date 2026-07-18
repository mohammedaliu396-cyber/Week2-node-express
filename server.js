require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Custom logging middleware (bonus)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static HTML page at /
app.use(express.static(path.join(__dirname, 'public')));

// POST /user
app.post('/user', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
