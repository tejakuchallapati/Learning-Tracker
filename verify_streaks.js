const mongoose = require('mongoose');
const DailyGoal = require('./server/models/DailyGoal');
const dotenv = require('dotenv');

dotenv.config({ path: './server/.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const testStreaks = async () => {
    await connectDB();

    const userId = new mongoose.Types.ObjectId(); // Mock user ID
    const goalTitle = 'Test Streak Goal ' + Date.now();

    console.log('--- Creating Goal ---');
    let goal = await DailyGoal.create({
        userId,
        title: goalTitle,
        emailReminders: true
    });
    console.log('Goal created:', goal.title);

    console.log('\n--- Test 1: First Completion (Today) ---');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Mock the request body for updateDailyGoal logic
    let updateBody = { completed: true };
    
    // Simulate the logic in dailyGoalController.js
    if (updateBody.completed) {
        goal.streak = 1;
        goal.lastCompletedDate = today;
        goal.completed = true;
    }
    await goal.save();
    console.log('First completion: streak should be 1. Result:', goal.streak);

    console.log('\n--- Test 2: Completion Today Again ---');
    // If completed today again, streak stays same
    if (updateBody.completed) {
        // lastCompletedDate is already today
        goal.streak = 1; 
    }
    await goal.save();
    console.log('Same day completion: streak should be 1. Result:', goal.streak);

    console.log('\n--- Test 3: Completion Next Day ---');
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Mock the logic for "tomorrow"
    // In reality, the cron job resets 'completed' to false at midnight
    goal.completed = false;
    
    const lastDate = new Date(goal.lastCompletedDate);
    if (lastDate.getTime() === today.getTime()) {
        // goal.lastCompletedDate was "yesterday" relative to "tomorrow"
        goal.streak += 1;
        goal.lastCompletedDate = tomorrow;
        goal.completed = true;
    }
    await goal.save();
    console.log('Next day completion: streak should be 2. Result:', goal.streak);

    console.log('\n--- Test 4: Gap in Completion ---');
    const threeDaysLater = new Date(tomorrow);
    threeDaysLater.setDate(threeDaysLater.getDate() + 2);
    
    goal.completed = false;
    // lastCompletedDate is "tomorrow" (2 days ago relative to threeDaysLater)
    const lastDateGap = new Date(goal.lastCompletedDate);
    const dayBeforeGap = new Date(threeDaysLater);
    dayBeforeGap.setDate(dayBeforeGap.getDate() - 1);
    
    if (lastDateGap.getTime() !== dayBeforeGap.getTime() && lastDateGap.getTime() !== threeDaysLater.getTime()) {
        goal.streak = 1;
        goal.lastCompletedDate = threeDaysLater;
        goal.completed = true;
    }
    await goal.save();
    console.log('Gap completion: streak should reset to 1. Result:', goal.streak);

    console.log('\n--- Cleaning up ---');
    await DailyGoal.deleteOne({ _id: goal._id });
    console.log('Test goal deleted.');

    mongoose.connection.close();
};

testStreaks();
