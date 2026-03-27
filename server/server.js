require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origin from env
const allowedOrigin = process.env.FRONTEND_URL;

// ✅ Debug logs
console.log("🔑 OPENROUTER KEY LOADED:", !!process.env.OPENROUTER_API_KEY);
console.log("📦 MONGO URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");
console.log("🌐 FRONTEND URL:", allowedOrigin);

// ✅ SIMPLE & CORRECT CORS (FINAL)
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ❌ DO NOT ADD app.options() — cors handles it automatically

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api', apiRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('🚀 AI Flow Backend Running');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 UNHANDLED ERROR:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});