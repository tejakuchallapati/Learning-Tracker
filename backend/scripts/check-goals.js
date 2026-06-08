const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const checkGoals = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // Define User schema
    const User = mongoose.model('User', new mongoose.Schema({ name: String, email: String }));

    // Define DailyGoal schema
    const dailyGoalSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      title: String,
      completed: Boolean,
      emailReminders: Boolean,
      streak: Number
    });
    const DailyGoal = mongoose.model('DailyGoal', dailyGoalSchema);

    const goals = await DailyGoal.find({}).populate('userId', 'name email');
    console.log(`Found ${goals.length} daily goals:`);
    goals.forEach(g => {
      console.log(`- User: ${g.userId ? g.userId.email : 'Unknown'}, Goal: "${g.title}", Completed: ${g.completed}, emailReminders: ${g.emailReminders}, Streak: ${g.streak}`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkGoals();
