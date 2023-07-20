const winston = require('winston');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// winston logger configuration
const logger = winston.createLogger({
  level: 'error', // Log only errors and above
  format: winston.format.json(), // Log data in JSON format
  defaultMeta: { service: 'service-name' },
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

// Configure Twilio
const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromPhoneNumber: process.env.YOUR_TWILIO_PHONE_NUMBER,
};

// Helper function to send mobile notification
async function sendMobileNotification(user, message) {
  const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

  try {
    const notification = await client.messages.create({
      body: message,
      from: twilioConfig.fromPhoneNumber,
      to: user.mobile, // Assuming user.mobile contains the user's mobile number
    });

    console.log('Mobile notification sent:', notification.sid);
  } catch (error) {
    logError('Error sending mobile notification:', error.message);
  }
}

// Configure Nodemailer
const nodemailerConfig = {
  fromEmail: process.env.FROM_EMAIL,
  transporter: nodemailer.createTransport({
    // Configure the email transport options (e.g., SMTP settings)
  }),
};

// Helper function to send email notification
async function sendEmailNotification(user, message) {
  const mailOptions = {
    from: nodemailerConfig.fromEmail,
    to: user.email,
    subject: 'Failed Automated Deposit',
    text: message,
  };

  try {
    await nodemailerConfig.transporter.sendMail(mailOptions);
    console.log('Email notification sent to:', user.email);
  } catch (error) {
    logError('Error sending email notification:', error.message);
  }
}

module.exports = { logError, sendMobileNotification, sendEmailNotification };
