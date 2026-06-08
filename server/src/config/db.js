const mongoose = require('mongoose');

const connectDB = async (retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      const isLast = attempt === retries;
      console.error(`MongoDB connect attempt ${attempt}/${retries}: ${error.message}`);
      if (isLast) process.exit(1);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
};

module.exports = connectDB;
