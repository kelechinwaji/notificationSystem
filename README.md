# notificationSystem
This is a backend application that handles the notification process when an automated deposit fails due to insufficient funds in a user's wallet. It sends mobile notifications and emails to users in such cases. The application is built using Node.js and Express, and it communicates with external microservices for user management and wallet information.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:


2. Change to the project directory:


3. Install the dependencies:


4. Create a `.env` file in the project root and add the following environment variables:

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
FROM_EMAIL=your_email@example.com

To start the server, run the following command:

npm start

The server will start running on `http://localhost:3000`.

### Triggering a Notification

To trigger a notification, make a POST request to `http://localhost:3000/api/trigger-notification` with the following JSON data in the request body:

```json
{
  "userId": "user123",
  "amount": 100,
  "notificationType": "email"
}

Implementation Details
The application is structured as follows:

* app.js: This is the main file where the Express server is created, It handles incoming HTTP requests.

* notification.js: This file fetches user information from the User Management Service, checks the wallet balance using the User Wallet microservice, and sends notifications via SMS or email based on the specified notificationType.

sendEmailNotification.js: This is a separate module that contains the sendEmailNotification function, which uses Nodemailer to send email notifications to users.

logger.js: This is another separate module that contains the logError function. It uses Winston to log errors to both the console and a file.

The application uses the body-parser middleware to parse JSON and URL-encoded data in the request body. It also employs environment variables to securely store sensitive information like Twilio credentials and email addresses.

Additional Features/Improvements
Separation of Concerns: The implementation follows the principle of separation of concerns by splitting the notification logic into separate functions and modules.

Error Handling: The application includes robust error handling to catch and log errors that may occur during the notification process.

Environment Variables: Sensitive information, such as Twilio credentials and email addresses, is stored in environment variables to enhance security.

Logging: The application logs errors using Winston to facilitate easy debugging and monitoring.

Note:
This application is a simplified example intended to demonstrate the logic and implementation for an automated deposit notification system. The instances and data used are based on assumptions specific to this use case. 