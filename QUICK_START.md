# ⚡ Quick Start - Alcoa Backend

Get your email backend running in 5 minutes!

## 🚀 Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create .env File
```bash
copy env.example .env
```

### 3. Configure Gmail App Password

1. **Enable 2FA:** https://myaccount.google.com/security
2. **Generate App Password:** https://myaccount.google.com/apppasswords
3. Copy the 16-character password

### 4. Edit .env File
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

### 5. Start Server
```bash
npm run dev
```

### 6. Test
Visit: http://localhost:5000/api/health

✅ You're done! 

---

## 📧 Test Email

Send test email using PowerShell:
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+971501234567"
    message = "Test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/email/send-contact" -Method POST -Body $body -ContentType "application/json"
```

---

## 🆘 Issues?

**Email not sending?**
- ✅ Use App Password (not regular password)
- ✅ Remove spaces from App Password
- ✅ Check spam folder

**CORS error?**
- ✅ Check FRONTEND_URL matches exactly

**Port in use?**
- ✅ Change PORT in .env to 5001

---

Full docs: [BACKEND_SETUP_GUIDE.md](../BACKEND_SETUP_GUIDE.md)

