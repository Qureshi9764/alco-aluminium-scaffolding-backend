# Alcoa Scaffolding Backend - Complete Project Structure

## 📂 Directory Structure

```
backend/
│
├── config/                          # Configuration Files
│   ├── app.config.js               # Application settings (CORS, rate limits, etc.)
│   └── email.config.js             # Email/Nodemailer configuration
│
├── controllers/                     # Request Handlers
│   └── email.controller.js         # Email endpoint controllers
│
├── middleware/                      # Express Middleware
│   ├── errorHandler.js             # Error handling middleware
│   ├── rateLimiter.js              # Rate limiting configuration
│   ├── requestLogger.js            # Request logging middleware
│   └── security.js                 # Security (XSS, sanitization)
│
├── routes/                          # API Routes
│   └── email.routes.js             # Email-related routes
│
├── services/                        # Business Logic
│   └── email.service.js            # Email sending service
│
├── utils/                           # Utility Functions
│   ├── emailTemplates.js           # HTML email templates
│   └── logger.js                   # Logging utility
│
├── validators/                      # Input Validation
│   └── email.validator.js          # Email validation schemas
│
├── node_modules/                    # Dependencies (auto-generated)
│
├── .env                            # Environment variables (YOU CREATE THIS)
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── API_DOCUMENTATION.md            # Complete API documentation
├── EMAIL_TROUBLESHOOTING.md        # Email troubleshooting guide
├── package.json                    # Project dependencies
├── package-lock.json               # Locked dependencies
├── PROJECT_STRUCTURE.md            # This file
├── QUICK_START.md                  # Quick start guide
├── README.md                       # Main documentation
└── server.js                       # Application entry point
```

---

## 🎯 Key Features Implemented

### ✅ **Professional Folder Structure**
- Separation of concerns (MVC pattern)
- Modular and maintainable code
- Easy to scale and extend

### ✅ **Email Functionality**
- Contact form submission with auto-reply
- Quote request with auto-reply
- Professional HTML email templates
- Plain text fallback for better deliverability
- Proper email headers to avoid spam

### ✅ **Security**
- Helmet.js for HTTP headers
- CORS configuration
- XSS protection
- Input sanitization
- SQL injection prevention
- Rate limiting (API & Email)

### ✅ **Validation**
- Email format validation
- Phone number validation
- String length validation
- Input sanitization
- Comprehensive error messages

### ✅ **Logging**
- Structured logging with timestamps
- Request/response tracking
- Error logging with stack traces
- Email activity monitoring
- UAE timezone support

### ✅ **Error Handling**
- Centralized error handling
- Meaningful error messages
- Development vs Production modes
- Graceful shutdown handling

---

## 🔄 Request Flow

```
Client Request
    ↓
[Express Server] (server.js)
    ↓
[Security Middleware] (security.js)
    ↓
[Rate Limiter] (rateLimiter.js)
    ↓
[Request Logger] (requestLogger.js)
    ↓
[Route Handler] (email.routes.js)
    ↓
[Controller] (email.controller.js)
    ├── Validates Input (email.validator.js)
    └── Calls Service
        ↓
[Service] (email.service.js)
    ├── Creates Email Templates (emailTemplates.js)
    ├── Sends via Nodemailer (email.config.js)
    └── Logs Activity (logger.js)
        ↓
[Response to Client]
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| GET | `/api/health` | Health check | 100/15min |
| POST | `/api/email/send-contact` | Send contact form | 10/hour |
| POST | `/api/email/send-quote` | Send quote request | 10/hour |
| GET | `/api/email/test` | Test email config (dev only) | 100/15min |

---

## 🔧 Configuration Files

### `config/app.config.js`
- Server port and environment
- CORS settings
- Rate limiting rules
- Email settings
- Security headers
- Logging configuration

### `config/email.config.js`
- Nodemailer transporter
- Gmail SMTP settings
- Recipient addresses
- Sender information

### `.env` (You create this)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 🛡️ Security Layers

1. **Helmet.js** - Secure HTTP headers
2. **CORS** - Cross-Origin Resource Sharing
3. **Rate Limiting** - Prevent abuse
4. **Input Validation** - Sanitize user input
5. **XSS Protection** - Remove malicious scripts
6. **Error Handling** - Don't leak sensitive info

---

## 📊 Logging Levels

- **INFO** - General information (API requests, etc.)
- **SUCCESS** - Successful operations (emails sent)
- **WARNING** - Warnings (validation errors, rate limits)
- **ERROR** - Errors and exceptions
- **DEBUG** - Debug info (development only)

---

## 📧 Email Features

### For Contact Form:
1. **Company Email** - Notification with all details
2. **Customer Email** - Auto-reply confirmation

### For Quote Request:
1. **Company Email** - Quote details notification
2. **Customer Email** - Quote request confirmation

### Email Improvements:
- ✅ HTML + Plain text versions
- ✅ Professional templates with branding
- ✅ Proper Reply-To headers
- ✅ Anti-spam headers
- ✅ Unique tracking IDs
- ✅ UAE timezone timestamps

---

## 🚀 How to Use

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp env.example .env
# Edit .env with your settings
```

### 3. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

### 4. Test Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Send contact form
curl -X POST http://localhost:5000/api/email/send-contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+971581375601","message":"Test message"}'
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation and setup guide |
| `API_DOCUMENTATION.md` | Complete API reference |
| `EMAIL_TROUBLESHOOTING.md` | Email delivery troubleshooting |
| `PROJECT_STRUCTURE.md` | This file - project overview |
| `QUICK_START.md` | Quick start guide (if exists) |

---

## 🧪 Testing

### Manual Testing
1. Use Postman or cURL
2. Test with your own email address
3. Check spam folders
4. Verify email headers

### Automated Testing (Future)
```bash
npm test
```

---

## 📦 Dependencies

### Production
- `express` - Web framework
- `nodemailer` - Email sending
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `express-rate-limit` - Rate limiting
- `helmet` - Security headers

### Development
- `nodemon` - Auto-reload during development

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `NODE_ENV` | No | development | Environment |
| `FRONTEND_URL` | No | http://localhost:5173 | Frontend URL |
| `EMAIL_USER` | Yes | - | Gmail address |
| `EMAIL_PASS` | Yes | - | Gmail app password |
| `SECONDARY_EMAIL` | No | - | Secondary recipient |
| `SUPPORT_EMAIL` | No | - | Support email |
| `LOG_LEVEL` | No | info | Logging level |

---

## 🎨 Code Style

- **Clean Code** - Readable and maintainable
- **Comments** - Well-documented
- **Modular** - Separated concerns
- **DRY** - Don't Repeat Yourself
- **Error Handling** - Comprehensive
- **Logging** - Detailed tracking

---

## 🚦 Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Validation error |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Route not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal error |
| 503 | Service Unavailable | Email service down |

---

## 🔄 Update History

### Version 1.0.0 (Current)
✅ Professional folder structure
✅ Contact form endpoint
✅ Quote request endpoint
✅ Email templates
✅ Security middleware
✅ Rate limiting
✅ Input validation
✅ Logging system
✅ Error handling
✅ Documentation

### Future Enhancements
- [ ] Unit tests
- [ ] Integration tests
- [ ] Database integration
- [ ] File upload support
- [ ] Email queue system
- [ ] Admin dashboard
- [ ] Analytics tracking

---

## 🤝 Contributing

1. Follow the existing structure
2. Add comments for complex logic
3. Update documentation
4. Test thoroughly
5. Follow code style

---

## 📞 Support

**Email:** alcoaaluminiumscaffolding1@gmail.com  
**Phone:** +971 58 137 5601  
**Emergency:** 24/7 Hotline

---

**Built with ❤️ for Alcoa Aluminium Scaffolding**  
**Developer:** Professional Backend Implementation  
**Date:** October 2024  
**Version:** 1.0.0

