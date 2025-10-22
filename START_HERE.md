# 🚀 Quick Start - Resend Email Setup

## ⚡ 3 Steps to Get Started

### Step 1: Create `.env` File

In the `backend` folder, create a file named `.env` and paste this:

```env
RESEND_API_KEY=re_CvdzT36t_7KHxdymvBesH1qdDRJ2a4yzm
RESEND_FROM_EMAIL=Sales@alcoascaffolding.com
COMPANY_EMAIL=Sales@alcoascaffolding.com
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Step 2: Start Server

```bash
cd backend
npm run dev
```

Look for this message:
```
✅ Using Resend Email Service
```

### Step 3: Test It

**Quick Test:**
```bash
node test-resend.js
```

**Or visit:**
```
http://localhost:5000/api/email/test
```

**Or use the contact form on your website!**

---

## ✅ That's it!

Your emails will now be sent via Resend to: **Sales@alcoascaffolding.com**

For detailed documentation, see: `RESEND_SETUP_GUIDE.md`

