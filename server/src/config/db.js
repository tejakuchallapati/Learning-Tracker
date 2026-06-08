const dns = require('dns');
const mongoose = require('mongoose');

const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
};

let dnsFallbackApplied = false;

const applyDnsFallback = () => {
  if (dnsFallbackApplied) return;
  dnsFallbackApplied = true;
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', ...dns.getServers()]);
};

const connectDB = async (retries = 3) => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, MONGO_OPTIONS);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      const isSrvError = /querySrv|ECONNREFUSED/i.test(error.message);

      if (isSrvError && !dnsFallbackApplied) {
        applyDnsFallback();
        console.warn('MongoDB SRV DNS failed — retrying with public DNS resolvers...');
        continue;
      }

      const isLast = attempt === retries;
      console.error(`MongoDB connect attempt ${attempt}/${retries}: ${error.message}`);
      if (isLast) process.exit(1);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
};

module.exports = connectDB;
