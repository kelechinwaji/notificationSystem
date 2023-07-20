// Import helper functions to send email, sms and log errors
const {sendEmailNotification, logError, sendMobileNotification} = require('./helper');

// Helper function to fetch user information using a fake User Service API
async function fetchUserInformation(userId) {
    // Code to fetch user information using Axios
    
    try {
      const response = await axios.get(`http://user-management-service/api/users/${userId}`);
      return response.data;
    } catch (error) {
      logError(`Error fetching user information for userID: ${userId}. Error: ${error.message}`);
      throw new Error('Failed to fetch user information.');
    }
  }
  
  // Helper function to fetch user wallet information using a fake User Wallet microservice API
  async function fetchUserWallet(userId) {
    // Code to fetch user wallet information using Axios
   
    try {
      const user = await fetchUserInformation(userId);
      const response = await axios.get(`http://xend-wallet-service/api/wallets/${user.walletId}`);
      return response.data;
    } catch (error) {
      logError(`Error fetching user wallet for userID: ${userId}. Error: ${error.message}`);
      throw new Error('Failed to fetch user wallet information.');
    }
  }
  
  
  
  // Function to handle the notification process
  async function handleFailedDepositNotification(userId, amount, notificationType) {
    try {
      const user = await fetchUserInformation(userId);
      const wallet = await fetchUserWallet(userId);
  
      // Check if the user's wallet balance is insufficient
      if (wallet.balance < amount) {
        // message to inform a user
        const message = `Dear ${user.name}, your automated deposit of ${amount} failed due to insufficient funds in your wallet. Please add funds to your wallet to resolve the issue.`;
  
        // Send notification based on the notification type
        if (notificationType === 'mobile') {
          await sendMobileNotification(user, message);
        } else if (notificationType === 'email') {
          await sendEmailNotification(user, message);
        }
      }
    } catch (error) {
      logError(error.message);
    }
  }

module.exports = handleFailedDepositNotification;