# 🚀 Quick Deployment Commands

## Copy and paste these commands to deploy!

---

## **Option 1: Deploy Backend as Separate Repository (Recommended)**

### Step 1: Create GitHub Repository
Go to: https://github.com/new
- Name: `alcoa-scaffolding-backend`
- Visibility: Private or Public
- Don't initialize with anything
- Click "Create repository"

### Step 2: Push Backend Code

```bash
# Navigate to backend directory
cd "D:\New folder\HYD\alcoa-scaffolding\backend"

# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend setup for Render deployment"

# Add remote (REPLACE YOUR_USERNAME with your actual GitHub username!)
git remote add origin https://github.com/YOUR_USERNAME/alcoa-scaffolding-backend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you get an error about existing remote:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/alcoa-scaffolding-backend.git
git push -u origin main
```

---

## **Option 2: Deploy from Existing Monorepo**

### Commit Backend to Existing Repository

```bash
# Navigate to project root
cd "D:\New folder\HYD\alcoa-scaffolding"

# Add backend directory
git add backend/

# Add documentation
git add BACKEND_SETUP_GUIDE.md
git add EMAIL_INTEGRATION_SUMMARY.md

# Commit
git commit -m "Add production-ready backend API"

# Push
git push origin main
```

---

## **Render Configuration Copy-Paste**

### Environment Variables (All at once)

Copy this entire block and paste in Render's "Environment Variables" section:

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=http://localhost:5173
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

**⚠️ IMPORTANT:** After deploying frontend, update `FRONTEND_URL` to your actual frontend URL!

---

## **Render Service Configuration**

When creating Web Service on Render, use these settings:

```
Name: alcoa-scaffolding-backend
Region: Frankfurt
Branch: main
Root Directory: backend (only if using monorepo, otherwise leave empty)
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free (or Starter for production)
```

---

## **Test Your Deployment**

### Using curl:

```bash
# Test health endpoint
curl https://YOUR-SERVICE-NAME.onrender.com/api/health

# Test contact form
curl -X POST https://YOUR-SERVICE-NAME.onrender.com/api/email/send-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+971501234567",
    "message": "Testing deployment!"
  }'
```

### Using Browser:

Open: `https://YOUR-SERVICE-NAME.onrender.com/api/health`

---

## **Update Frontend After Deployment**

In your React app, update API URL:

```javascript
// Option 1: Hardcode
const API_URL = 'https://alcoa-scaffolding-backend.onrender.com/api';

// Option 2: Environment-based
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://alcoa-scaffolding-backend.onrender.com/api'
  : 'http://localhost:5000/api';

// Option 3: Use environment variable (best)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

---

## **Future Updates**

After making changes to your backend:

```bash
# Navigate to backend
cd "D:\New folder\HYD\alcoa-scaffolding\backend"

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update email templates"

# Push to GitHub
git push origin main

# Render will automatically deploy! 🚀
```

---

## **Useful Render Commands**

### Check deployment status:
- Go to: https://dashboard.render.com
- Select your service
- View "Logs" tab

### Manual redeploy:
- Go to "Manual Deploy" button
- Click "Deploy latest commit"

### View logs:
- Click "Logs" tab in dashboard
- Real-time logs shown

---

## **Quick Links**

- **Create GitHub Repo:** https://github.com/new
- **Render Dashboard:** https://dashboard.render.com
- **Sign Up Render:** https://render.com
- **Render Docs:** https://render.com/docs

---

## **Support**

If you encounter issues:

1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure GitHub repository is accessible
4. Check package.json has correct scripts
5. Test locally first: `npm start`

---

**Ready to deploy?** Follow the steps in `RENDER_DEPLOYMENT_GUIDE.md`!

Good luck! 🚀

