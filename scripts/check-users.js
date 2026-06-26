const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', 'server', '.env') });

const checkUsers = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('Error: MONGO_URI not found in server/.env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      reminderEmail: String,
      createdAt: Date,
    });
    const User = mongoose.model('User', userSchema);

    const users = await User.find({}, 'name email reminderEmail createdAt');

    if (users.length === 0) {
      console.log('No users found in the database.');
    } else {
      console.log(`\nFound ${users.length} user(s):`);
      console.table(users.map((u) => ({
        Name: u.name,
        Email: u.email,
        'Reminder email': u.reminderEmail || u.email || '(not set)',
        Joined: u.createdAt,
      })));
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

checkUsers();
