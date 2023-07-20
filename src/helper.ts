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

// Helper function to send email notification
async function sendEmailNotification(user, message) {
  // Code to send email notification
  // Use Nodemailer to send email notifications
  // Replace your_email@example.com with your email address
  const transporter = nodemailer.createTransport({
    // Configure the email transport options (e.g., SMTP settings)
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to: user.email,
    subject: 'Failed Automated Deposit',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent to:', user.email);
  } catch (error) {
    logError('Error sending email notification:', error.message);
  }
}




module.exports = {logError, sendMobileNotification, sendEmailNotification};
