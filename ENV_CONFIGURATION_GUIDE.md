# Environment Variables Configuration Guide

## 📋 Complete `.env` File Structure

All configuration is now managed through the `.env` file. No need to edit code files!

---

## 🔧 Environment Variables Explained

### **Server Configuration**

```env
PORT=5000
```
- The port your backend server runs on
- Default: 5000
- Change if port is already in use

```env
NODE_ENV=development
```
- Environment mode: `development` or `production`
- `development` shows detailed errors
- `production` hides sensitive error details

---

### **Frontend URL (CORS)**

```env
FRONTEND_URL=http://localhost:5173
```
- URL of your React frontend
- Used for CORS (Cross-Origin Resource Sharing)
- **Production:** Change to your live website URL (e.g., `https://alcoascaffolding.com`)

---

### **Email Configuration**

#### **EMAIL_USER** (Required)
```env
EMAIL_USER=qureshianas8486@gmail.com
```
- Gmail account used to **SEND** emails
- This is the "From" address in emails
- Must have Gmail App Password enabled

#### **EMAIL_PASS** (Required)
```env
EMAIL_PASS=mlukldhholvxcrks
```
- Gmail App Password (16 characters, no spaces)
- **NOT your regular Gmail password!**
- Generate at: https://myaccount.google.com/apppasswords

#### **COMPANY_EMAIL** (Important!)
```env
COMPANY_EMAIL=qureshianas8486@gmail.com
```
- Email address that **RECEIVES** customer inquiries
- This is where YOU get notifications
- Can be same as EMAIL_USER or different

**Example Scenarios:**

**Scenario 1: Same email for sending and receiving**
```env
EMAIL_USER=qureshianas8486@gmail.com     # Sends emails
COMPANY_EMAIL=qureshianas8486@gmail.com   # Receives notifications
```

**Scenario 2: Different emails**
```env
EMAIL_USER=qureshianas8486@gmail.com              # Sends emails
COMPANY_EMAIL=alcoaaluminiumscaffolding1@gmail.com # Receives notifications
```

#### **SECONDARY_EMAIL** (Optional)
```env
SECONDARY_EMAIL=alcoaaluminiumscaffolding1@gmail.com
```
- Additional recipient for customer inquiries
- Notifications sent to both COMPANY_EMAIL and SECONDARY_EMAIL

#### **SUPPORT_EMAIL** (Optional)
```env
SUPPORT_EMAIL=qureshianas8486@gmail.com
```
- Support email displayed in customer auto-reply emails
- Customers can reply to this email for questions

---

### **Company Information**

These appear in email templates sent to customers:

#### **COMPANY_NAME**
```env
COMPANY_NAME=Alcoa Aluminium Scaffolding
```
- Your company name
- Appears in email headers and footers

#### **COMPANY_ADDRESS**
```env
COMPANY_ADDRESS=Musaffah, Abu Dhabi, UAE
```
- Your company address
- Shown in customer confirmation emails

#### **EMERGENCY_HOTLINE**
```env
EMERGENCY_HOTLINE=+971 58 137 5601
```
- Emergency contact number
- Displayed prominently in customer emails
- Include country code

#### **RESPONSE_TIME**
```env
RESPONSE_TIME=2 hours
```
- Expected response time for customer inquiries
- Shown in customer confirmation emails
- Examples: `2 hours`, `24 hours`, `same day`

---

### **Logging & Timezone**

#### **LOG_LEVEL**
```env
LOG_LEVEL=info
```
- Logging detail level
- Options: `error`, `warn`, `info`, `debug`
- `info` is recommended

#### **TIMEZONE**
```env
TIMEZONE=Asia/Dubai
```
- Timezone for timestamps in emails and logs
- UAE timezone: `Asia/Dubai`
- Format: IANA timezone identifier

---

## 🔄 How Email Flow Works

### **When Customer Submits Contact Form:**

```
Customer fills form:
├── Name: Anas
├── Email: customer@example.com
├── Phone: +971501234567
└── Message: "I need scaffolding..."

                    ↓
                    
        Backend sends 2 emails:

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│   Company Notification          │  │   Customer Auto-Reply           │
│                                 │  │                                 │
│ FROM: EMAIL_USER                │  │ FROM: EMAIL_USER                │
│ TO:   COMPANY_EMAIL             │  │ TO:   customer@example.com      │
│                                 │  │                                 │
│ Contains:                       │  │ Contains:                       │
│ • All customer details          │  │ • Thank you message             │
│ • Customer message              │  │ • Summary of inquiry            │
│ • Quick action buttons          │  │ • COMPANY_NAME                  │
│                                 │  │ • COMPANY_ADDRESS               │
│                                 │  │ • EMERGENCY_HOTLINE             │
│                                 │  │ • RESPONSE_TIME                 │
└─────────────────────────────────┘  └─────────────────────────────────┘
```

---

## 🚀 Quick Setup Guide

### **Step 1: Create/Update .env File**

```bash
# If .env doesn't exist, copy from template
cp env.example .env

# Then edit .env
nano .env  # or use any text editor
```

### **Step 2: Configure Required Fields**

**Minimum required:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
COMPANY_EMAIL=your-email@gmail.com
```

### **Step 3: Optional Customization**

Customize company information:
```env
COMPANY_NAME=Your Company Name
COMPANY_ADDRESS=Your Address
EMERGENCY_HOTLINE=Your Phone Number
RESPONSE_TIME=Your Response Time
```

### **Step 4: Restart Server**

```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

---

## ✅ Validation Checklist

Before testing, verify:

- [ ] `EMAIL_USER` is a valid Gmail address
- [ ] `EMAIL_PASS` is a Gmail App Password (16 chars)
- [ ] `COMPANY_EMAIL` is where you want to receive inquiries
- [ ] `COMPANY_NAME` is correct
- [ ] `EMERGENCY_HOTLINE` includes country code
- [ ] `FRONTEND_URL` matches your frontend URL
- [ ] `.env` file is in the `/backend` directory
- [ ] Server restarted after changes

---

## 🧪 Testing

### **Test Email Configuration:**

```bash
# Run test endpoint (development only)
curl http://localhost:5000/api/email/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email configuration is valid"
}
```

### **Test Contact Form:**

1. Go to your website
2. Fill out contact form
3. Submit
4. Check emails:
   - ✅ `COMPANY_EMAIL` inbox (company notification)
   - ✅ Customer's inbox (auto-reply)
   - ⚠️ **Check spam folders!**

---

## 🔐 Security Best Practices

### **DO:**
- ✅ Keep `.env` file private (never commit to Git)
- ✅ Use Gmail App Passwords (never regular password)
- ✅ Enable 2-Factor Authentication on Gmail
- ✅ Use environment-specific `.env` files (dev, staging, prod)
- ✅ Regularly rotate App Passwords

### **DON'T:**
- ❌ Share `.env` file publicly
- ❌ Commit `.env` to GitHub/GitLab
- ❌ Use plain Gmail password
- ❌ Include `.env` in Docker images
- ❌ Email passwords in plain text

---

## 🛠️ Troubleshooting

### **Issue: "Email transporter verification failed"**

**Solution:**
1. Check `EMAIL_USER` is correct Gmail address
2. Verify `EMAIL_PASS` is App Password (not regular password)
3. Ensure App Password has no spaces
4. Check 2FA is enabled on Gmail account

### **Issue: "Not receiving emails at COMPANY_EMAIL"**

**Solution:**
1. Check `COMPANY_EMAIL` is set correctly
2. Check spam/junk folder
3. Verify email address has no typos
4. Check server logs for errors

### **Issue: "Changes not taking effect"**

**Solution:**
1. Save `.env` file
2. Restart server (Ctrl+C, then `npm run dev`)
3. Clear any caching
4. Check server console for startup logs

### **Issue: "Customer not receiving auto-reply"**

**Solution:**
1. Tell customer to check spam folder
2. Ask customer to add your email to contacts
3. Check server logs for sending confirmation
4. Test with different email provider

---

## 📊 Environment Variable Priority

The system uses fallback values:

```javascript
COMPANY_EMAIL → EMAIL_USER → Default

Example:
1. If COMPANY_EMAIL is set → Uses COMPANY_EMAIL
2. If COMPANY_EMAIL is empty → Uses EMAIL_USER
3. If both empty → Uses hardcoded default (not recommended)
```

**Best Practice:** Always set `COMPANY_EMAIL` explicitly!

---

## 🔄 Multiple Environments

### **Development (.env)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=dev@example.com
COMPANY_EMAIL=dev@example.com
```

### **Production (.env.production)**
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://alcoascaffolding.com
EMAIL_USER=info@alcoascaffolding.com
COMPANY_EMAIL=contact@alcoascaffolding.com
```

---

## 📞 Support

**Issue:** Can't receive emails  
**Check:** `.env` configuration, spam folders, server logs

**Issue:** Email format looks wrong  
**Check:** Company info variables in `.env`

**Issue:** Changes not applying  
**Check:** Server restart, `.env` file saved

---

## ✅ Complete Example .env

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Authentication
EMAIL_USER=qureshianas8486@gmail.com
EMAIL_PASS=mlukldhholvxcrks

# Email Recipients
COMPANY_EMAIL=qureshianas8486@gmail.com
SECONDARY_EMAIL=alcoaaluminiumscaffolding1@gmail.com
SUPPORT_EMAIL=qureshianas8486@gmail.com

# Company Info
COMPANY_NAME=Alcoa Aluminium Scaffolding
COMPANY_ADDRESS=Musaffah, Abu Dhabi, UAE
EMERGENCY_HOTLINE=+971 58 137 5601
RESPONSE_TIME=2 hours

# System
LOG_LEVEL=info
TIMEZONE=Asia/Dubai
```

---

**Last Updated:** October 2024  
**Configuration Version:** 2.0  
**Status:** Production Ready ✅

