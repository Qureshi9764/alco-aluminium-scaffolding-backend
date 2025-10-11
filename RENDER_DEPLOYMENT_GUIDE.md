# 🚀 Render.com Deployment Guide - Step by Step

## ✅ Pre-Deployment Checklist

Your project is ready! Here's what we have:
- ✅ `.gitignore` configured
- ✅ `package.json` with correct scripts
- ✅ Environment variables documented
- ✅ Professional folder structure
- ✅ All dependencies installed

---

## 📋 **STEP-BY-STEP DEPLOYMENT PROCESS**

### **Step 1: Create GitHub Repository for Backend**

Since your backend is in a subdirectory, we have two options:

#### **Option A: Deploy Backend as Separate Repository (Recommended)**

1. **Create a new GitHub repository:**
   - Go to: https://github.com/new
   - Repository name: `alcoa-scaffolding-backend`
   - Description: `Backend API for Alcoa Scaffolding`
   - Visibility: Private (recommended) or Public
   - **Don't** initialize with README (we already have files)
   - Click "Create repository"

2. **Push backend code to GitHub:**

```bash
# Navigate to backend directory
cd "D:\New folder\HYD\alcoa-scaffolding\backend"

# Initialize git (if not already done in this directory)
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend setup for deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/alcoa-scaffolding-backend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### **Option B: Deploy from Monorepo (Current Setup)**

If you want to keep backend in the same repo as frontend:

1. Commit all changes in the parent directory:
```bash
cd "D:\New folder\HYD\alcoa-scaffolding"
git add backend/
git add BACKEND_SETUP_GUIDE.md
git add EMAIL_INTEGRATION_SUMMARY.md
git commit -m "Add backend API with email integration"
git push origin main
```

---

### **Step 2: Sign Up on Render.com**

1. Go to: https://render.com
2. Click "Get Started"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

---

### **Step 3: Create New Web Service**

1. **On Render Dashboard:**
   - Click "New +" button (top right)
   - Select "Web Service"

2. **Connect Repository:**
   
   **If Option A (Separate Repo):**
   - Find `alcoa-scaffolding-backend` in the list
   - Click "Connect"
   
   **If Option B (Monorepo):**
   - Find your main repository
   - Click "Connect"

3. **Configure Service:**

   **Basic Settings:**
   ```
   Name: alcoa-scaffolding-backend
   Region: Frankfurt (closest to UAE)
   Branch: main
   Root Directory: backend (if using monorepo, leave empty if separate repo)
   ```

   **Build & Deploy:**
   ```
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

   **Instance Type:**
   - For testing: **Free** (sleeps after 15 min)
   - For production: **Starter** ($7/month, no sleep)

---

### **Step 4: Add Environment Variables**

**IMPORTANT:** In Render dashboard, scroll down to "Environment Variables" section.

Click "Add Environment Variable" for each of these:

```env
NODE_ENV=production

PORT=5000

FRONTEND_URL=https://your-frontend-url.vercel.app
(or http://localhost:5173 for testing)

EMAIL_USER=qureshianas8486@gmail.com

EMAIL_PASS=mlukldhholvxcrks

COMPANY_EMAIL=qureshianas8486@gmail.com

SECONDARY_EMAIL=alcoaaluminiumscaffolding1@gmail.com

SUPPORT_EMAIL=qureshianas8486@gmail.com

COMPANY_NAME=Alcoa Aluminium Scaffolding

COMPANY_ADDRESS=Musaffah, Abu Dhabi, UAE

EMERGENCY_HOTLINE=+971 58 137 5601

RESPONSE_TIME=2 hours

LOG_LEVEL=info

TIMEZONE=Asia/Dubai
```

**💡 Tip:** You can use "Add from .env" button and paste all at once:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app
EMAIL_USER=qureshianas8486@gmail.com
EMAIL_PASS=mlukldhholvxcrks
COMPANY_EMAIL=qureshianas8486@gmail.com
SECONDARY_EMAIL=alcoaaluminiumscaffolding1@gmail.com
SUPPORT_EMAIL=qureshianas8486@gmail.com
COMPANY_NAME=Alcoa Aluminium Scaffolding
COMPANY_ADDRESS=Musaffah, Abu Dhabi, UAE
EMERGENCY_HOTLINE=+971 58 137 5601
RESPONSE_TIME=2 hours
LOG_LEVEL=info
TIMEZONE=Asia/Dubai
```

---

### **Step 5: Deploy!**

1. Click "Create Web Service" button at the bottom
2. Render will start building your app
3. Watch the deployment logs in real-time
4. Wait 2-5 minutes for deployment to complete

**You'll see:**
```
=== Installing dependencies
npm install
...
=== Build successful!
=== Starting service
Server running on port 5000
✅ Email transporter is ready
```

---

### **Step 6: Get Your Backend URL**

After successful deployment, your backend will be available at:

```
https://alcoa-scaffolding-backend.onrender.com
```

**Test Endpoints:**
- Health Check: `https://alcoa-scaffolding-backend.onrender.com/api/health`
- Root: `https://alcoa-scaffolding-backend.onrender.com/`

---

### **Step 7: Test Your Deployed Backend**

#### **Test 1: Health Check**

Open in browser or use curl:
```bash
curl https://alcoa-scaffolding-backend.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Alcoa Scaffolding API is running",
  "timestamp": "2024-10-11T...",
  "environment": "production",
  "emailConfigured": true,
  "version": "1.0.0"
}
```

#### **Test 2: Contact Form**

```bash
curl -X POST https://alcoa-scaffolding-backend.onrender.com/api/email/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+971501234567",
    "message": "Testing deployment"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email sent successfully. We will contact you within 2 hours."
}
```

---

### **Step 8: Update Frontend to Use Production API**

In your React frontend, update the API URL:

**Before (Development):**
```javascript
const API_URL = 'http://localhost:5000/api';
```

**After (Production):**
```javascript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://alcoa-scaffolding-backend.onrender.com/api'
  : 'http://localhost:5000/api';
```

**Or create environment file (.env) in frontend:**
```env
VITE_API_URL=https://alcoa-scaffolding-backend.onrender.com/api
```

Then use:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

### **Step 9: Update FRONTEND_URL in Render**

After deploying your frontend, update the `FRONTEND_URL` in Render:

1. Go to Render dashboard
2. Select your backend service
3. Click "Environment" tab
4. Edit `FRONTEND_URL` to your actual frontend URL:
   - Example: `https://alcoa-scaffolding.vercel.app`
5. Click "Save Changes"
6. Service will auto-redeploy

---

## 🔄 **Auto-Deploy on Git Push**

Once set up, Render automatically deploys when you push to GitHub!

```bash
# Make changes to your code
# Commit and push
git add .
git commit -m "Update email templates"
git push origin main

# Render automatically detects and deploys! 🚀
```

---

## 📊 **Monitoring Your Deployment**

### **View Logs:**
1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab
4. See real-time logs

### **Check Metrics:**
1. Click "Metrics" tab
2. See CPU, Memory, Request metrics

### **View Events:**
1. Click "Events" tab
2. See deployment history

---

## ⚙️ **Render Settings Overview**

### **General Tab:**
- Service name
- Region
- Branch
- Build command
- Start command

### **Environment Tab:**
- All environment variables
- Can add/edit/delete

### **Settings Tab:**
- Custom domain
- Health check path (default: `/`)
- Auto-deploy on push

### **Deploys Tab:**
- Deployment history
- Manual deploy button
- Rollback option

---

## 🆓 **Free vs Paid Plans**

### **Free Plan:**
- ✅ 750 hours/month
- ✅ Automatic HTTPS
- ✅ GitHub auto-deploy
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 50-second cold start
- ⚠️ 512 MB RAM

**Good for:** Testing, development, hobby projects

### **Starter Plan ($7/month):**
- ✅ Always on (no sleep!)
- ✅ 512 MB RAM
- ✅ Faster performance
- ✅ Better for production

**Good for:** Real business, customer-facing apps

### **Standard Plan ($25/month):**
- ✅ 2 GB RAM
- ✅ Priority support
- ✅ More CPU

---

## 🔧 **Common Render Issues & Solutions**

### **Issue 1: Build Failed**

**Symptoms:**
```
npm ERR! Missing dependencies
```

**Solution:**
- Check `package.json` has all dependencies
- Ensure `npm install` runs locally without errors
- Check Render build logs for specific error

### **Issue 2: Service Won't Start**

**Symptoms:**
```
Error: Cannot find module...
```

**Solution:**
- Verify `Start Command` is `npm start`
- Check `server.js` exists
- Ensure all imports are correct

### **Issue 3: Environment Variables Not Working**

**Symptoms:**
```
⚠️ WARNING: Email credentials not configured
```

**Solution:**
- Go to Environment tab
- Add all required variables
- Click "Save Changes"
- Service will redeploy

### **Issue 4: CORS Errors**

**Symptoms:**
```
Access to fetch has been blocked by CORS policy
```

**Solution:**
- Update `FRONTEND_URL` in Render environment variables
- Should match your actual frontend URL
- Save and redeploy

### **Issue 5: Cold Start Delay (Free Plan)**

**Symptoms:**
- First request takes 30-50 seconds
- Timeout errors

**Solution:**
- Upgrade to Starter plan ($7/month)
- Or use a "keep-alive" service to ping your API every 10 minutes

---

## 🎯 **Post-Deployment Checklist**

After deployment, verify:

- [ ] Health endpoint returns 200 OK
- [ ] Root endpoint shows API info
- [ ] Contact form endpoint works
- [ ] Quote form endpoint works
- [ ] Emails are being sent (check inbox)
- [ ] Customer emails received (check spam too)
- [ ] Logs show no errors
- [ ] Frontend can connect to backend
- [ ] CORS is working correctly

---

## 📈 **Upgrading to Paid Plan**

When you're ready:

1. Go to Render dashboard
2. Select your service
3. Click "Settings" tab
4. Under "Instance Type", select "Starter"
5. Click "Save Changes"
6. Add payment method
7. Confirm upgrade

**Your service will upgrade with zero downtime!**

---

## 🔐 **Security Best Practices**

### **Environment Variables:**
- ✅ Never commit `.env` to Git
- ✅ Use Render's environment variables
- ✅ Different values for dev/prod
- ✅ Rotate passwords regularly

### **Custom Domain:**
1. Buy domain (e.g., api.alcoascaffolding.com)
2. In Render, go to "Settings" → "Custom Domain"
3. Add your domain
4. Update DNS records as shown
5. Wait for SSL certificate (automatic)

---

## 📞 **Getting Help**

**Render Support:**
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Email: support@render.com

**Your Backend Issues:**
- Check logs in Render dashboard
- Review environment variables
- Test locally first

---

## ✅ **Deployment Summary**

**Your Backend URL:**
```
https://alcoa-scaffolding-backend.onrender.com
```

**API Endpoints:**
```
GET  /api/health
GET  /
POST /api/email/send-contact
POST /api/email/send-quote
```

**Environment:** Production  
**Region:** Frankfurt  
**Auto-Deploy:** Enabled  
**HTTPS:** Enabled  

---

## 🎉 **Congratulations!**

Your backend is now:
- ✅ Deployed to production
- ✅ Publicly accessible
- ✅ Automatically deploying from GitHub
- ✅ Secured with HTTPS
- ✅ Ready for your frontend to use

**Test it now:**
```
https://alcoa-scaffolding-backend.onrender.com/api/health
```

**Next Steps:**
1. Deploy your frontend
2. Update frontend to use production API
3. Test complete flow
4. Launch! 🚀

---

**Deployed By:** Render.com  
**Date:** October 2024  
**Status:** LIVE ✅  
**Documentation:** Complete

