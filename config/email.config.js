/**
 * Email Configuration
 * Handles nodemailer transporter setup and email-related configurations
 */

const nodemailer = require('nodemailer');

// Email configuration settings
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Optional: Add additional SMTP settings if needed
  secure: true, // Use TLS
  tls: {
    rejectUnauthorized: false
  }
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
    const transporter = nodemailer.createTransport(emailConfig);
    
    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
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

