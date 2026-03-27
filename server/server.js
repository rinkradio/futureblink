require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Debug checks (keep during development)
console.log("🔑 OPENROUTER KEY LOADED:", !!process.env.OPENROUTER_API_KEY);
console.log("📦 MONGO URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");

// ✅ Routes
app.use('/api', apiRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // stop app if DB fails
  });

// ✅ Health check route (optional but useful)
app.get('/', (req, res) => {
  res.send('🚀 AI Flow Backend Running');
});

// ✅ Global Error Handler (extra safety)
app.use((err, req, res, next) => {
  console.error('🔥 UNHANDLED ERROR:', err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});