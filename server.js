require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import configurations
const config = require('./config/app.config');
const logger = require('./utils/logger');

// Import middleware
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { apiLimiter, emailLimiter } = require('./middleware/rateLimiter');
const requestLogger = require('./middleware/requestLogger');
const { sanitizeRequest, detectSuspiciousActivity, handleCORS } = require('./middleware/security');

// Import routes
const emailRoutes = require('./routes/email.routes');

const app = express();
const PORT = config.server.port;

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet(config.security.helmet));

// CORS configuration
app.use(cors(config.cors));
app.use(handleCORS);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (config.server.env === 'development') {
  app.use(requestLogger);
}

// Security middleware
app.use(sanitizeRequest);
app.use(detectSuspiciousActivity);

// General API rate limiting
app.use('/api/', apiLimiter);

// Routes with email-specific rate limiting
app.use('/api/email', emailLimiter, emailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
  
  res.status(200).json({ 
    status: 'OK', 
    message: 'Alcoa Scaffolding API is running',
    timestamp: new Date().toISOString(),
    environment: config.server.env,
    emailConfigured: emailConfigured,
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Alcoa Scaffolding API',
    version: '1.0.0',
    environment: config.server.env,
    endpoints: {
      health: 'GET /api/health',
      sendContact: 'POST /api/email/send-contact',
      sendQuote: 'POST /api/email/send-quote',
      ...(config.server.env === 'development' && { testEmail: 'GET /api/email/test' })
    },
    documentation: 'https://github.com/alcoa-scaffolding/api-docs'
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.serverStarted(PORT, config.server.env);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

module.exports = app;

