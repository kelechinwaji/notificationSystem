const winston = require('winston');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Configure winston logger with console and file transports
const logger = winston.createLogger({
  level: 'error', // Log only errors and above
  format: winston.format.json(), // Log data in JSON format
  defaultMeta: { service: 'your-service-name' }, 
  transports: [
    // Log errors to the console
    new winston.transports.Console(),

    // Log errors to a file 
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Helper function to log errors
function logError(message) {
  // Log the error using the winston logger
  logger.error(message);
}



module.exports = {logError, sendMobileNotification, sendEmailNotification};
