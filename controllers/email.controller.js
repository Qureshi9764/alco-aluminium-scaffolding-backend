/**
 * Email Controller
 * Handles HTTP requests for email-related endpoints
 */

const emailService = require('../services/email.service');
const { validateContactForm, validateQuoteForm } = require('../validators/email.validator');
const logger = require('../utils/logger');

class EmailController {
  /**
   * Send contact form email
   * POST /api/email/send-contact
   */
  async sendContact(req, res, next) {
    try {
      logger.apiRequest('POST', '/api/email/send-contact', req.ip);
      
      // Validate input
      const validation = validateContactForm(req.body);
      
      if (!validation.isValid) {
        logger.warn('Contact form validation failed', { errors: validation.errors });
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.errors
        });
      }

      // Send email
      const result = await emailService.sendContactFormEmail(validation.sanitizedData);

      res.status(200).json(result);
    } catch (error) {
      logger.error('Contact form error', error);
      next(error);
    }
  }

  /**
   * Send quote request email
   * POST /api/email/send-quote
   */
  async sendQuote(req, res, next) {
    try {
      logger.apiRequest('POST', '/api/email/send-quote', req.ip);
      
      // Validate input
      const validation = validateQuoteForm(req.body);
      
      if (!validation.isValid) {
        logger.warn('Quote form validation failed', { errors: validation.errors });
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.errors
        });
      }

      // Send email
      const result = await emailService.sendQuoteRequestEmail(validation.sanitizedData);

      res.status(200).json(result);
    } catch (error) {
      logger.error('Quote request error', error);
      next(error);
    }
  }

  /**
   * Test email configuration
   * GET /api/email/test (only in development)
   */
  async testEmail(req, res, next) {
    try {
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
          error: 'This endpoint is only available in development mode'
        });
      }

      const result = await emailService.testEmailConfig();
      res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
      logger.error('Email test error', error);
      next(error);
    }
  }
}

module.exports = new EmailController();

