/**
 * Email Configuration
 * Handles nodemailer transporter setup and email-related configurations
 */

const nodemailer = require('nodemailer');

// Email configuration settings
// Gmail often blocks port 465 from cloud servers, so we use port 587 with STARTTLS
const emailConfig = {
  host: 'smtp.gmail.com',
  port: 587,  // Use 587 for STARTTLS (more reliable for cloud servers)
  secure: false, // Use STARTTLS (upgraded connection)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }, 
  // Connection pool and timeout settings for production
  pool: true, // Use connection pool
  maxConnections: 3, // Reduced for better stability
  maxMessages: 10,
  rateDelta: 1000, // 1 second between messages
  rateLimit: 3, // Max 3 messages per rateDelta
  // Extended timeout settings for cloud servers
  connectionTimeout: 90000, // 90 seconds (increased)
  greetingTimeout: 45000, // 45 seconds (increased)
  socketTimeout: 90000, // 90 seconds (increased)
  // TLS settings for STARTTLS
  requireTLS: true, // Require TLS upgrade
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
    ciphers: 'SSLv3'
  },
  // Debug output
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
};

// Company email recipients
const recipients = {
  primary: process.env.COMPANY_EMAIL || process.env.EMAIL_USER,  // Main recipient email
  secondary: process.env.SECONDARY_EMAIL || process.env.COMPANY_EMAIL || process.env.EMAIL_USER,
  support: process.env.SUPPORT_EMAIL || process.env.COMPANY_EMAIL || process.env.EMAIL_USER
};

// Create reusable transporter
const createTransporter = () => {
  try {
    // Check if credentials are configured
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      throw new Error('Email credentials not configured');
    }

    const transporter = nodemailer.createTransport(emailConfig);
    
    // Verify transporter configuration (async, non-blocking)
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
        console.error('Please check your Gmail credentials and ensure:');
        console.error('1. EMAIL_USER is correct');
        console.error('2. EMAIL_PASS is a valid Gmail App Password');
        console.error('3. 2-Step Verification is enabled on Gmail');
      } else {
        console.log('✅ Email transporter is ready to send messages');
      }
    });
    
    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    throw error;
  }
};

// Email sender details
const senderInfo = {
  from: `"Alcoa Scaffolding" <${process.env.EMAIL_USER}>`,
  replyTo: process.env.EMAIL_USER
};

module.exports = {
  emailConfig,
  recipients,
  createTransporter,
  senderInfo
};

