const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });

const UserSchema = new mongoose.Schema({
    email: String
}, { strict: false });

const User = mongoose.model('User', UserSchema);

async function updateEmail() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await User.findOneAndUpdate({}, { email: 'teja26kt@gmail.com' }, { new: true });
        
        if (result) {
            console.log('Successfully updated email to:', result.email);
        } else {
            console.log('No user found to update.');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

updateEmail();
