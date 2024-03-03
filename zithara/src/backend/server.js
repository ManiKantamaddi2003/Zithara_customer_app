const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Import the PostgreSQL pool configuration

const app = express();

app.use(bodyParser.json());

// Define API endpoints
app.get('/api/customers', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customer');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
