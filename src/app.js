// Import necessary modules and libraries
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const handleFailedDepositNotification = require('./notification')

// Creates an instance of Express
const app = express();
const port = 3000; 

// body-parser middleware to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Endpoint to trigger the notification process
app.post('/api/trigger-notification', async (req, res) => {
    const userId = req.body.userId;
    const amount = parseFloat(req.body.amount);
    const notificationType = req.body.notificationType;
  
    try {
      await handleFailedDepositNotification(userId, amount, notificationType);
      res.status(200).json({ message: 'Notification process completed successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during the notification process.' });
    }
  });


// Starts the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });