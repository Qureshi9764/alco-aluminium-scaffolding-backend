# Email Troubleshooting Guide

## Issue: Customer Not Receiving Auto-Reply Emails

### What I Fixed:

1. ✅ **Added Plain Text Version**: Gmail prefers emails with both HTML and text versions
2. ✅ **Added Proper Headers**: 
   - `Auto-Submitted: auto-replied` - Marks as auto-reply
   - `X-Auto-Response-Suppress` - Prevents loop responses
   - Reply-To headers for better email threading
3. ✅ **Enhanced Email Priority**: Added importance headers
4. ✅ **Better Email Threading**: Added unique entity reference IDs

### Why Customer Emails Might Go to Spam:

1. **Gmail Spam Filter**: Auto-reply emails from the same account can trigger spam filters
2. **New Account**: If your Gmail account is new, it has lower sender reputation
3. **High Volume**: Sending many emails quickly can trigger spam detection
4. **Missing SPF/DKIM**: Production deployments should have these DNS records

---

## 🔍 Immediate Steps to Check

### Step 1: Check Spam/Junk Folder
The customer should check their **Spam** or **Junk** folder. This is the most common issue.

### Step 2: Test with Your Own Email
```bash
# Test by sending to yourself
# Use your personal email as the "from" address in the form
```

### Step 3: Mark as "Not Spam"
If found in spam:
1. Select the email
2. Click "Not Spam" or "Move to Inbox"
3. This trains Gmail to recognize future emails

### Step 4: Add to Contacts
Add `qureshianas8486@gmail.com` to contacts to improve deliverability

---

## 🛠️ Gmail Account Settings

### Enable "Less Secure App Access" (if needed)
**Note:** This is deprecated. Use App Passwords instead (already done).

### Check Gmail Sending Limits
- **New Gmail accounts**: 500 emails/day
- **Established accounts**: 2000 emails/day
- **Hourly limit**: ~100-200 emails/hour

If you're testing heavily, you might hit these limits.

### Verify Your Domain (For Production)

For production, consider using:
1. **Google Workspace** (paid Gmail for business)
2. **SendGrid** (dedicated email service)
3. **Amazon SES** (AWS email service)
4. **Mailgun** (transactional email service)

---

## 📧 Test Email Delivery

### Test 1: Send to Your Own Email
```javascript
// In your contact form, use:
{
  "name": "Test User",
  "email": "qureshianas8486@gmail.com", // Your email
  "phone": "+971581375601",
  "message": "This is a test message"
}
```

Check if you receive the auto-reply in:
- ✅ Inbox
- ⚠️ Spam/Junk
- ⚠️ Promotions tab
- ⚠️ Updates tab

### Test 2: Send to Different Email Providers
Test with:
- Gmail (qureshianas8486@gmail.com)
- Yahoo (if you have)
- Outlook/Hotmail (if you have)
- Custom domain email

### Test 3: Check Email Headers
When you receive an email, check the headers:

**In Gmail:**
1. Open the email
2. Click three dots (⋮)
3. Select "Show original"
4. Look for:
   - `SPF: PASS` ✅
   - `DKIM: PASS` ✅
   - `DMARC: PASS` ✅

---

## 🚀 Production Recommendations

### Option 1: Use SendGrid (Recommended)
```bash
npm install @sendgrid/mail
```

**Benefits:**
- Better deliverability (99%+ inbox rate)
- No Gmail sending limits
- Detailed analytics
- Better spam score
- Free tier: 100 emails/day

**Setup:**
```javascript
// config/email.config.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### Option 2: Use Google Workspace
**Benefits:**
- Professional email (name@alcoascaffolding.com)
- Better sender reputation
- Higher sending limits
- Business features

**Cost:** ~$6/user/month

### Option 3: Use Amazon SES
**Benefits:**
- Very cheap ($0.10 per 1000 emails)
- Scalable
- Good deliverability

**Drawback:** More complex setup

---

## 🔧 Current Configuration Check

### Verify Your .env File
```env
EMAIL_USER=qureshianas8486@gmail.com  ✅
EMAIL_PASS=your-16-char-app-password   ✅
```

### Test Email Configuration
```bash
# In your browser or Postman
GET http://localhost:5000/api/email/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email configuration is valid"
}
```

---

## 📊 Monitoring Sent Emails

### Check Gmail Sent Folder
1. Go to Gmail
2. Click "Sent" folder
3. Look for your auto-reply emails
4. Check if they show "Delivered" status

### Enable Gmail Notifications
Check if you have delivery notifications enabled:
1. Gmail Settings → General
2. Look for "Desktop notifications"
3. Enable for all new mail

---

## 🐛 Debug Checklist

- [ ] Customer checked Spam/Junk folder
- [ ] Customer checked Promotions/Updates tabs (Gmail)
- [ ] Email shows in sender's "Sent" folder
- [ ] No errors in server logs
- [ ] Test email to yourself works
- [ ] Gmail App Password is correct
- [ ] Not hitting Gmail rate limits
- [ ] Customer email address is valid
- [ ] No typos in customer email

---

## 💡 Quick Fix: Tell Customers

Add this to your contact form confirmation:

```
✅ Thank you! We've sent a confirmation email to [email].

📬 Please check:
• Inbox
• Spam/Junk folder
• Promotions tab (if using Gmail)

If you don't see it within 5 minutes, please contact us directly.
```

---

## 🎯 Most Likely Solution

**99% of the time**, the email IS being sent successfully but is in the customer's **SPAM folder**.

**Action Items:**
1. Tell customers to check spam folder
2. Ask them to mark as "Not Spam"
3. Ask them to add your email to contacts
4. Consider using SendGrid for production

---

## 📞 Need Help?

If emails still don't arrive after checking spam:

1. **Check server logs** for any errors
2. **Test with multiple email addresses**
3. **Wait 5-10 minutes** (email can be delayed)
4. **Contact me** with specific error messages

---

**Built for Alcoa Aluminium Scaffolding** 🏗️

