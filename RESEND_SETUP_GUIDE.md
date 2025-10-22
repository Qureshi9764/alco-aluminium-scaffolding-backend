# 📧 Resend Email Service Setup Guide

## ✅ Installation Complete!

Resend has been successfully integrated into your Alcoa Scaffolding project. This guide will help you complete the setup and start using it.

---

## 🎯 What is Resend?

Resend is a modern, developer-friendly email API service that offers:
- ✅ **Simple Integration** - Easy to set up and use
- ✅ **Reliable Delivery** - High email deliverability rates
- ✅ **Free Tier** - 100 emails/day, 3,000 emails/month for free
- ✅ **Analytics** - Track email opens, clicks, and bounces
- ✅ **No SMTP Hassles** - Works perfectly on cloud hosting (Vercel, Netlify, AWS, etc.)

---

## 🚀 Quick Start

### Step 1: Create `.env` File

Your Resend API key has already been configured! Just create a `.env` file in the `backend` folder:

```bash
cd backend
```

Create a file named `.env` with the following content:

```env
# Resend Email Service Configuration
RESEND_API_KEY=re_CvdzT36t_7KHxdymvBesH1qdDRJ2a4yzm
RESEND_FROM_EMAIL=Sales@alcoascaffolding.com

# Company Email Configuration
COMPANY_EMAIL=Sales@alcoascaffolding.com
SUPPORT_EMAIL=Sales@alcoascaffolding.com
SECONDARY_EMAIL=Sales@alcoascaffolding.com

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Step 2: Verify Domain (Optional but Recommended)

For production use, you should verify your domain in Resend:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain: `alcoascaffolding.com`
3. Add the DNS records provided by Resend
4. Wait for verification (usually takes a few minutes)
5. Update `RESEND_FROM_EMAIL` to use your verified domain

**Note:** For testing, you can use Resend's default sending domain.

### Step 3: Test the Integration

#### Option A: Use the Test Endpoint

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Open your browser or Postman and visit:
   ```
   http://localhost:5000/api/email/test
   ```

3. You should receive a test email at `Sales@alcoascaffolding.com`

#### Option B: Test via Contact Form

1. Start both frontend and backend servers
2. Fill out the contact form on your website
3. Check your email inbox at `Sales@alcoascaffolding.com`

---

## 📝 How It Works

### Automatic Service Selection

The system automatically chooses the best email service:

1. **Primary:** If `RESEND_API_KEY` is configured → Uses Resend ✅
2. **Fallback:** If Resend not configured → Uses Nodemailer (Gmail/SendGrid)

### Email Flow

When a user submits the contact form:

```
User fills form → Backend validates → Resend sends 2 emails:
  1. Notification to you (Sales@alcoascaffolding.com)
  2. Auto-reply confirmation to customer
```

---

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | Yes | Your Resend API key | `re_xxx...` |
| `RESEND_FROM_EMAIL` | Yes | Sender email address | `Sales@alcoascaffolding.com` |
| `COMPANY_EMAIL` | Yes | Where to receive inquiries | `Sales@alcoascaffolding.com` |
| `SUPPORT_EMAIL` | No | Support email | `Sales@alcoascaffolding.com` |
| `NODE_ENV` | No | Environment mode | `development` or `production` |
| `PORT` | No | Server port | `5000` |
| `FRONTEND_URL` | Yes | Frontend URL for CORS | `http://localhost:5173` |

### Email Templates

All email templates are located in:
```
backend/utils/emailTemplates.js
```

The templates are fully customized for Alcoa Scaffolding and include:
- ✅ Professional HTML design
- ✅ Company branding
- ✅ Mobile responsive
- ✅ Contact information
- ✅ Quick action buttons

---

## 🧪 Testing Checklist

Use this checklist to verify everything works:

- [ ] Backend server starts without errors
- [ ] Console shows "✅ Using Resend Email Service"
- [ ] Test endpoint returns success
- [ ] Contact form sends emails successfully
- [ ] Quote form sends emails successfully
- [ ] Company receives notification emails
- [ ] Customers receive auto-reply emails
- [ ] Emails display correctly (check HTML rendering)
- [ ] Reply-to addresses work correctly

---

## 📊 Monitoring & Analytics

### Resend Dashboard

Access your Resend dashboard to:
- View all sent emails
- Check delivery status
- See email analytics
- Monitor API usage
- Troubleshoot issues

Dashboard: [https://resend.com/emails](https://resend.com/emails)

### Server Logs

Your backend includes detailed logging:
- Email send attempts
- Success/failure status
- Error messages
- Email IDs for tracking

Check console output while running the server.

---

## 🐛 Troubleshooting

### Issue: "RESEND_API_KEY not found"

**Solution:**
1. Ensure `.env` file exists in `backend/` folder
2. Verify `RESEND_API_KEY` is set correctly
3. Restart the server after adding `.env`

### Issue: "Email not received"

**Solution:**
1. Check spam/junk folder
2. Verify email address is correct
3. Check Resend dashboard for delivery status
4. Ensure domain is verified (for production)

### Issue: "Domain not verified"

**Solution:**
1. For testing: Use Resend's default domain (works immediately)
2. For production: Add DNS records and wait for verification

### Issue: "Rate limit exceeded"

**Solution:**
1. Free tier: 100 emails/day, 3,000/month
2. Upgrade plan if needed
3. Implement request throttling on frontend

---

## 📈 Production Deployment

### Before Going Live:

1. **Verify Domain:**
   - Add domain to Resend
   - Configure DNS records
   - Update `RESEND_FROM_EMAIL`

2. **Update Environment:**
   ```env
   NODE_ENV=production
   FRONTEND_URL=https://your-actual-domain.com
   ```

3. **Test Thoroughly:**
   - Send multiple test emails
   - Verify all email types work
   - Check email deliverability

4. **Monitor Usage:**
   - Check Resend dashboard regularly
   - Monitor email delivery rates
   - Set up alerts if needed

### Deployment Platforms

Resend works perfectly on:
- ✅ Vercel
- ✅ Netlify
- ✅ AWS Lambda
- ✅ Google Cloud Functions
- ✅ Azure Functions
- ✅ Railway
- ✅ Render
- ✅ Any Node.js hosting

---

## 💡 Best Practices

1. **Environment Variables:**
   - Never commit `.env` file to Git
   - Use different API keys for dev/production
   - Keep API keys secret

2. **Email Content:**
   - Test emails in multiple clients (Gmail, Outlook, etc.)
   - Keep HTML simple and responsive
   - Include plain text version

3. **Monitoring:**
   - Regularly check Resend dashboard
   - Monitor email delivery rates
   - Set up alerts for failures

4. **Security:**
   - Validate all form inputs
   - Implement rate limiting
   - Use CORS properly
   - Sanitize user data

---

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Node.js SDK](https://github.com/resendlabs/resend-node)
- [Email Best Practices](https://resend.com/docs/knowledge-base/email-best-practices)

---

## 🆘 Need Help?

If you encounter any issues:

1. Check server console logs
2. Review Resend dashboard
3. Verify environment variables
4. Check this troubleshooting guide
5. Contact Resend support (they're very responsive!)

---

## ✅ What's Included

This integration includes:

- ✅ Resend package installed
- ✅ Resend service created (`backend/services/resend.service.js`)
- ✅ Email controller updated with auto-fallback
- ✅ Environment configuration
- ✅ Professional email templates
- ✅ Error handling & retry logic
- ✅ Detailed logging
- ✅ Test endpoint
- ✅ This setup guide

---

## 🎉 You're All Set!

Your contact form is now powered by Resend! Users will receive professional, branded emails instantly.

**Current Status:**
- ✅ Resend installed and configured
- ✅ API key: `re_CvdzT36t_7KHxdymvBesH1qdDRJ2a4yzm`
- ✅ From email: `Sales@alcoascaffolding.com`
- ✅ Company email: `Sales@alcoascaffolding.com`

**Next Steps:**
1. Create `.env` file with the configuration above
2. Restart backend server
3. Test the contact form
4. Verify domain for production use

Happy emailing! 📧✨

