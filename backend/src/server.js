const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    service: 'RenewCred CMS API Server',
    message: 'Backend server is live and operating successfully.',
    healthCheck: '/api/v1/health',
    endpoints: {
      pages: '/api/v1/content/pages',
      authLogin: '/api/v1/auth/login'
    }
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/content', contentRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'RenewCred CMS API',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`RenewCred Backend Server running on port ${PORT}`);
    });
  }
});

module.exports = app;
