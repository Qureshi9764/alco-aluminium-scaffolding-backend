# Alcoa Scaffolding Backend API

A professional, production-ready Node.js backend API for the Alcoa Scaffolding website, featuring contact form and quote request email functionality with comprehensive security measures.

## 🚀 Features

- ✉️ **Email Services**: Contact form and quote request handling with auto-reply functionality
- 📧 **Triple Email Support**: Resend (recommended), SendGrid, and Gmail SMTP
- 🔒 **Security**: Helmet.js, CORS, input sanitization, and XSS protection
- ⚡ **Rate Limiting**: IP-based rate limiting for API and email endpoints
- 📝 **Validation**: Comprehensive input validation and sanitization
- 🎨 **Professional Email Templates**: Beautiful, responsive HTML email templates
- 📊 **Logging**: Structured logging with timestamps and request tracking
- 🛡️ **Error Handling**: Centralized error handling with meaningful error messages
- 🔄 **Graceful Shutdown**: Proper server shutdown handling
- ☁️ **Cloud-Ready**: Works on Render, Vercel, Netlify, Heroku, and more

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── app.config.js       # Application settings
│   └── email.config.js     # Email/Nodemailer configuration
├── controllers/            # Request handlers
│   └── email.controller.js # Email endpoint controllers
├── middleware/             # Express middleware
│   ├── errorHandler.js     # Error handling middleware
│   ├── rateLimiter.js      # Rate limiting configuration
│   ├── requestLogger.js    # Request logging
│   └── security.js         # Security middleware (XSS, sanitization)
├── routes/                 # API routes
│   └── email.routes.js     # Email-related routes
├── services/               # Business logic
│   ├── email.service.js    # Nodemailer email service (fallback)
│   └── resend.service.js   # Resend email service (primary)
├── utils/                  # Utility functions
│   ├── emailTemplates.js   # HTML email templates
│   └── logger.js           # Logging utility
├── validators/             # Input validation
│   └── email.validator.js  # Email validation schemas
├── .env                    # Environment variables (create from .env.example)
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── server.js               # Application entry point
└── README.md               # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- **For Production (Render/Vercel):** SendGrid account (FREE - 100 emails/day)
- **For Local Development:** Gmail account with App Password enabled

### Step 1: Clone and Install

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Step 2: Environment Configuration

```bash
# Create .env file from template
cp env.example .env

# Edit .env file with your configuration
nano .env  # or use your preferred editor
```

**Environment Variables:**

#### **Option A: SendGrid (Recommended for Production)**
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=your-email@gmail.com
COMPANY_EMAIL=your-company-email@gmail.com
```

#### **Option B: Gmail SMTP (Local Development)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
COMPANY_EMAIL=your-email@gmail.com
```

### Step 3A: Resend Setup (⭐ RECOMMENDED - Easiest!)

🎉 **NEW & RECOMMENDED:** Resend is now the easiest and most reliable option!

1. Your API Key is already configured: `re_CvdzT36t_7KHxdymvBesH1qdDRJ2a4yzm`
2. Just create `.env` file with:
   ```env
   RESEND_API_KEY=re_CvdzT36t_7KHxdymvBesH1qdDRJ2a4yzm
   RESEND_FROM_EMAIL=Sales@alcoascaffolding.com
   COMPANY_EMAIL=Sales@alcoascaffolding.com
   ```
3. That's it! No complex setup needed.

**Benefits:**
- ✅ Works on ALL cloud platforms (Render, Vercel, Netlify, AWS, etc.)
- ✅ Free: 100 emails/day, 3,000/month
- ✅ Simple setup (just API key)
- ✅ Excellent deliverability
- ✅ Real-time analytics dashboard

📖 **Detailed Guide:** See `RESEND_SETUP_GUIDE.md` and `START_HERE.md` for instructions

### Step 3B: SendGrid Setup (Alternative for Production)

If you prefer SendGrid over Resend:

1. Sign up at [SendGrid](https://signup.sendgrid.com/) (FREE - 100 emails/day)
2. Verify your email address
3. Create API Key at [API Keys](https://app.sendgrid.com/settings/api_keys)
   - Click "Create API Key"
   - Name: `Alcoa-Backend`
   - Permission: "Full Access"
   - Copy the key (starts with `SG.`)
4. Verify sender at [Sender Authentication](https://app.sendgrid.com/settings/sender_auth/senders)
   - Click "Create New Sender"
   - Fill in your details and verify email
5. Add to your deployment platform:
   ```env
   SENDGRID_API_KEY=SG.your_copied_key
   SENDGRID_FROM_EMAIL=your-verified-email@gmail.com
   ```

📖 **Detailed Guide:** See `SENDGRID_SETUP.md` for step-by-step instructions

### Step 3C: Gmail App Password Setup (For Local Development)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and your device
5. Copy the 16-character password (remove spaces)
6. Paste it in your `.env` file as `EMAIL_PASS`

⚠️ **Note:** Gmail SMTP won't work on cloud platforms like Render due to port blocking!

### Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Alcoa Scaffolding API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development",
  "emailConfigured": true,
  "version": "1.0.0"
}
```

### Send Contact Form
```http
POST /api/email/send-contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971581375601",
  "company": "ABC Construction",
  "projectType": "commercial",
  "message": "I need scaffolding for my project"
}
```

**Required Fields:**
- `name` (string, 2-100 chars)
- `email` (valid email format)
- `phone` (valid phone number)
- `message` (string, 10-5000 chars)

**Optional Fields:**
- `company` (string, max 200 chars)
- `projectType` (residential|commercial|industrial|emergency|rental|consultation)

### Send Quote Request
```http
POST /api/email/send-quote
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971581375601",
  "company": "ABC Construction",
  "projectType": "commercial",
  "message": "Additional requirements",
  "projectHeight": "10",
  "coverageArea": "500",
  "duration": "1-3 months",
  "startDate": "2024-02-01"
}
```

**Required Fields:**
- `name`, `email`, `phone` (same as contact form)

**Optional Fields:**
- All contact form optional fields
- `projectHeight` (number, 0-1000 meters)
- `coverageArea` (number, 0-100000 sqm)
- `duration` (string)
- `startDate` (date string)

### Test Email Configuration (Development Only)
```http
GET /api/email/test
```

## 🔒 Security Features

### Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Email Endpoints**: 10 requests per hour per IP/email combination

### Input Validation

- Email format validation
- Phone number format validation
- String length validation
- XSS attack prevention
- Script tag removal
- SQL injection prevention

### Security Headers

- Helmet.js for secure HTTP headers
- CORS configuration
- Content Security Policy

## 📝 Email Templates

The API sends two types of emails for each request:

1. **Company Notification**: Detailed form submission to Alcoa team
2. **Customer Auto-Reply**: Confirmation email to the customer

Features:
- Responsive HTML design
- Professional styling
- Company branding
- Contact information
- UAE timezone timestamps

## 🧪 Testing

```bash
# Test the server is running
curl http://localhost:5000/api/health

# Test contact form (replace with actual data)
curl -X POST http://localhost:5000/api/email/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+971581375601",
    "message": "Test message"
  }'

# Test email configuration (development only)
curl http://localhost:5000/api/email/test
```

## 📊 Logging

The application provides structured logging with:

- Request/response logging
- Email activity tracking
- Error logging with stack traces
- Performance metrics
- UAE timezone timestamps

Log Levels:
- `info`: General information
- `success`: Successful operations
- `warn`: Warnings and validation errors
- `error`: Errors and exceptions
- `debug`: Debug information (development only)

## 🚨 Error Handling

All errors are handled centrally with appropriate HTTP status codes:

- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error
- `503`: Service Unavailable

## 🔧 Configuration

### App Configuration (`config/app.config.js`)

Centralized configuration for:
- Server settings
- CORS options
- Rate limiting
- Email settings
- Security headers
- Logging options

### Email Configuration (`config/email.config.js`)

Email-related settings:
- Nodemailer transporter
- Recipient addresses
- Sender information

## 📦 Dependencies

### Production Dependencies
- `express`: Web framework
- `resend`: Modern email API (recommended)
- `nodemailer`: Email sending
- `cors`: CORS middleware
- `dotenv`: Environment variables
- `express-rate-limit`: Rate limiting
- `helmet`: Security headers

### Development Dependencies
- `nodemon`: Auto-reload during development

## 🚀 Deployment

### Email Service Selection

The backend **automatically selects** the email service based on environment variables:

- ✅ If `SENDGRID_API_KEY` is set → Uses **SendGrid** (recommended for production)
- ✅ If not set → Uses **Gmail SMTP** (local development only)

**Why SendGrid for production?**
- Cloud providers (Render, Vercel, Heroku) block Gmail SMTP ports
- SendGrid works everywhere without port blocking
- Better deliverability (emails don't go to spam)
- 100 free emails/day (no credit card required)

### Render Deployment (Quick Fix for Your Issue)

🚨 **Your contact form timeout issue will be fixed by using SendGrid!**

1. **Get SendGrid API Key:**
   - Sign up: https://signup.sendgrid.com/
   - Create API key: https://app.sendgrid.com/settings/api_keys
   - Verify sender: https://app.sendgrid.com/settings/sender_auth/senders

2. **Add to Render:**
   - Go to Dashboard → Your Service → Environment
   - Add: `SENDGRID_API_KEY=SG.your_key_here`
   - Add: `SENDGRID_FROM_EMAIL=qureshianas8486@gmail.com`
   - Save (auto-deploys)

3. **Test:**
   - Check logs for: `✅ Using SendGrid for email delivery`
   - Submit contact form
   - Check emails

📖 **Detailed Guide:** See `QUICK_FIX_DEPLOYMENT.md` or `SENDGRID_SETUP.md`

### Production Checklist

1. ✅ Set `NODE_ENV=production`
2. ✅ Update `FRONTEND_URL` to production URL
3. ✅ **Configure SendGrid** (required for cloud hosting)
4. ✅ Set `COMPANY_EMAIL` for receiving notifications
5. ✅ Enable HTTPS on your hosting platform
6. ✅ Monitor logs for successful email delivery

### PM2 Deployment (VPS/Dedicated Server)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name alcoa-backend

# Save PM2 configuration
pm2 save

# Setup auto-restart on server reboot
pm2 startup
```

**Note:** Even with PM2 on VPS, SendGrid is recommended for better deliverability.

## 🤝 Contributing

1. Follow the existing code structure
2. Add comments for complex logic
3. Update documentation for new features
4. Test thoroughly before committing

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For support, email: Sales@alcoascaffolding.com

---

**Built with ❤️ for Alcoa Aluminium Scaffolding**

