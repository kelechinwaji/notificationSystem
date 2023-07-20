// Import necessary modules and libraries
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // Import body-parser

// Create an instance of Express
const app = express();
const port = 3000; 

// Configure body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });