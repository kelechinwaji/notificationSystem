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

// Helper function to send mobile notification
async function sendMobileNotification(user, message) {
  // Code to send mobile notification
  // Use Twilio to send SMS notifications
  // Replace YOUR_TWILIO_ACCOUNT_SID, YOUR_TWILIO_AUTH_TOKEN, and YOUR_TWILIO_PHONE_NUMBER with your Twilio credentials
  const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
  const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
  const client = twilio(accountSid, authToken);

  const mobileNumber = user.mobile; // Assuming user.mobile contains the user's mobile number

  try {
    const notification = await client.messages.create({
      body: message,
      from: 'YOUR_TWILIO_PHONE_NUMBER', // Replace with your Twilio phone number
      to: mobileNumber,
    });

    console.log('Mobile notification sent:', notification.sid);
  } catch (error) {
    logError('Error sending mobile notification:', error.message);
  }
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
