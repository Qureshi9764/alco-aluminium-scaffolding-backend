# 🏗️ Backend Architecture

## Project Structure

```
backend/
├── server.js              # Main server entry point
├── routes/
│   └── email.js          # Email API routes
├── package.json          # Dependencies
├── .env                  # Environment variables (DO NOT COMMIT)
├── env.example           # Example environment file
├── .gitignore           # Git ignore rules
├── README.md            # Full documentation
├── QUICK_START.md       # Quick start guide
└── ARCHITECTURE.md      # This file
```

## Technology Stack

### Core Dependencies
- **Express** (v4.18.2) - Web framework for Node.js
- **Nodemailer** (v6.9.7) - Email sending library
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **Dotenv** (v16.3.1) - Environment variable management

### Security & Middleware
- **Helmet** (v7.1.0) - Security headers
- **Express Rate Limit** (v7.1.5) - API rate limiting

## How It Works

### 1. Server Initialization (server.js)

```javascript
Express Server
├── Security Middleware (Helmet)
├── CORS Configuration
├── Body Parsers (JSON, URL-encoded)
├── Rate Limiting (10 requests/15min)
├── Routes (/api/email)
└── Error Handling
```

### 2. Email Routes (routes/email.js)

#### POST /api/email/send-contact
**Purpose:** Handle contact form submissions

**Flow:**
1. Receives form data (name, email, phone, message, etc.)
2. Validates required fields
3. Validates email format
4. Creates Nodemailer transporter
5. Sends email to company
6. Sends auto-reply to customer
7. Returns success/error response

**Email Templates:**
- Company Email: Beautiful HTML with all form details
- Customer Email: Thank you message with company contact info

#### POST /api/email/send-quote
**Purpose:** Handle quote request submissions

**Flow:**
1. Receives quote data (project details + contact info)
2. Validates required fields
3. Creates formatted quote email
4. Sends to company email
5. Returns success/error response

### 3. Email Configuration

Uses Gmail SMTP:
```
Service: Gmail
Host: smtp.gmail.com
Port: 587 (TLS)
Auth: App Password (NOT regular password)
```

## Security Features

### 1. CORS Protection
```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})
```
- Only allows requests from configured frontend URL
- Prevents unauthorized API access

### 2. Rate Limiting
```javascript
rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10                      // Max 10 requests
})
```
- Prevents spam/abuse
- Limits requests per IP address

### 3. Input Validation
- Required field checking
- Email format validation
- Sanitized error messages

### 4. Helmet Security Headers
- XSS Protection
- Content Security Policy
- DNS Prefetch Control
- Referrer Policy

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Email sent successfully. We will contact you within 2 hours."
}
```

### Error Response
```json
{
  "error": "Failed to send email",
  "details": "Error message (development only)"
}
```

## Email Templates

### Company Notification Email
- Modern gradient design
- All form fields displayed in cards
- Contact info clickable (mailto, tel links)
- Timestamp in UAE timezone
- Professional branding

### Customer Auto-Reply Email
- Confirmation message
- Copy of submitted message
- Company contact information
- Emergency hotline details
- Professional footer

## Environment Variables

```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment (development/production)
FRONTEND_URL=http://...      # Frontend URL for CORS
EMAIL_USER=...@gmail.com     # Gmail address
EMAIL_PASS=...               # Gmail App Password
```

## Error Handling

### Middleware Error Handler
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

### Try-Catch in Routes
- All async operations wrapped in try-catch
- Detailed error logging in development
- Generic error messages in production

## Performance Considerations

### Rate Limiting
- Prevents abuse
- Protects server resources
- Configurable limits

### Async Operations
- Non-blocking email sending
- Efficient error handling
- Promise-based architecture

### Lightweight Dependencies
- Minimal npm packages
- Fast startup time
- Low memory footprint

## Deployment Considerations

### Environment
- Set `NODE_ENV=production` in production
- Use environment variables for all secrets
- Never commit `.env` file

### CORS
- Update `FRONTEND_URL` to production URL
- Ensure exact match (http/https, trailing slash)

### Email Provider
- Gmail has daily sending limits (~500/day)
- For high volume, consider:
  - SendGrid
  - AWS SES
  - Mailgun

## Testing

### Manual Testing
1. Health check: `GET /api/health`
2. Send email: `POST /api/email/send-contact`
3. Check Gmail inbox
4. Verify auto-reply received

### Using cURL/Postman
```bash
POST http://localhost:5000/api/email/send-contact
Content-Type: application/json

{
  "name": "Test",
  "email": "test@example.com",
  "phone": "+971501234567",
  "message": "Test"
}
```

## Monitoring & Logging

### Console Logging
- Server start confirmation
- Email send success/failure
- Error details (development only)
- Request validation failures

### Production Recommendations
- Implement proper logging (Winston, Morgan)
- Error tracking (Sentry)
- Uptime monitoring (UptimeRobot)

## Scalability

### Current Implementation
- Single server instance
- Synchronous email sending
- Suitable for low-medium traffic

### Future Improvements
- Message queue (RabbitMQ, Redis)
- Load balancing
- Horizontal scaling
- Caching layer
- Database for email logs

## Integration Points

### Frontend Integration
```javascript
fetch('http://localhost:5000/api/email/send-contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Response Handling
```javascript
if (response.ok) {
  // Success - show confirmation
} else {
  // Error - show error message
}
```

## Troubleshooting

### Common Issues
1. **Invalid login**: Use App Password, not regular password
2. **CORS error**: Check FRONTEND_URL matches exactly
3. **Rate limit**: Wait 15 minutes or increase limit
4. **Port in use**: Change PORT in .env

### Debug Mode
```bash
NODE_ENV=development npm run dev
```
- Shows detailed error messages
- Verbose logging
- Stack traces

## Best Practices

✅ Always use environment variables for secrets  
✅ Validate all user input  
✅ Implement rate limiting  
✅ Use HTTPS in production  
✅ Keep dependencies updated  
✅ Log important events  
✅ Handle errors gracefully  
✅ Test before deploying  

## Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Express.js Guide](https://expressjs.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Version:** 1.0.0  
**Last Updated:** October 2025

