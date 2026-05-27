const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const resetPassword = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const email = 'teja26kt@gmail.com';
    const newPassword = 'password123'; // Default reset password

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      await mongoose.connection.close();
      return;
    }

    user.password = newPassword;
    // Save will trigger the pre-save hook to hash the password
    await user.save();
    
    console.log(`SUCCESS: Password for ${email} has been successfully reset to: "${newPassword}"`);
    console.log('You can now log in using these credentials.');

    await mongoose.connection.close();
  } catch (err) {
    console.error('Error resetting password:', err);
  }
};

resetPassword();
