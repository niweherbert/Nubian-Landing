# 🎯 Quick Reference Card - Deployment

Print or bookmark this page for quick reference!

---

## 🔗 Important URLs

### Sign Up Pages
```
MongoDB Atlas:  https://www.mongodb.com/cloud/atlas/register
Railway:        https://railway.app
Vercel:         https://vercel.com/signup
```

### Your Live URLs (fill in after deployment)
```
Frontend:       https://___________________________
Backend API:    https://___________________________/api
API Docs:       https://___________________________/docs
MongoDB:        https://cloud.mongodb.com
```

---

## 🔑 Environment Variables

### Backend (Railway)
```bash
MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority"
DB_NAME="nubian_landing"
CORS_ORIGINS="https://your-frontend.vercel.app"
```

### Frontend (Vercel)
```bash
REACT_APP_API_URL="https://your-backend.railway.app/api"
```

---

## 🚀 Railway Configuration

```
Root Directory:  backend
Start Command:   uvicorn server:app --host 0.0.0.0 --port $PORT
```

---

## 🎨 Vercel Configuration

```
Framework:       Create React App
Root Directory:  frontend
Build Command:   npm run build
Output:          build
```

---

## 🧪 Test Commands

### Test Backend API
```bash
# Health check
curl https://your-backend-url/api/

# Subscribe email
curl -X POST "https://your-backend-url/api/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Get subscribers
curl https://your-backend-url/api/subscribers
```

### Test Frontend
```
Open: https://your-frontend-url
Submit test email
Check for success message
```

---

## 🔧 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| CORS Error | Update CORS_ORIGINS in Railway |
| 404 API Error | Check REACT_APP_API_URL has `/api` |
| DB Connection Failed | Verify MongoDB connection string |
| Build Failed | Check deployment logs |
| Env vars not working | Redeploy after changing vars |

---

## 📊 MongoDB Quick Commands

### View Data
```bash
mongosh
use nubian_landing
db.email_subscriptions.find().pretty()
db.email_subscriptions.countDocuments()
```

### Create Index
```bash
db.email_subscriptions.createIndex(
  { "email": 1 }, 
  { unique: true }
)
```

### Export Data
```bash
# In Atlas Dashboard
Collections → email_subscriptions → Export
```

---

## ⚡ Quick Deployment Steps

1. **MongoDB Atlas** (10 min)
   - Create cluster
   - Create user
   - Allow network access
   - Copy connection string

2. **Railway** (15 min)
   - Connect GitHub
   - Set root directory: `backend`
   - Add environment variables
   - Generate domain

3. **Vercel** (10 min)
   - Import repository
   - Set root directory: `frontend`
   - Add REACT_APP_API_URL
   - Deploy

4. **Connect** (5 min)
   - Update CORS in Railway
   - Test subscription
   - Verify database

**Total: ~40 minutes**

---

## 📱 Share Your Link

Once deployed, share:
```
🌐 My new landing page is live!
Sign up to be the first to know when we launch:
https://your-site.vercel.app

#startup #launch #comingsoon
```

---

## 🆘 Support Links

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://www.mongodb.com/docs/atlas
- FastAPI Docs: https://fastapi.tiangolo.com

---

## 💰 Costs

```
MongoDB Atlas:  FREE (512 MB)
Railway:        FREE ($5 credit/month)
Vercel:         FREE (unlimited)
──────────────────────────────
TOTAL:          $0/month! 🎉
```

---

## ✅ Success Checklist

- [ ] MongoDB cluster created
- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Email subscription tested
- [ ] Duplicate prevention tested
- [ ] Database showing data
- [ ] URLs shared with team

---

## 🎯 Your Credentials (Keep Secure!)

```
MongoDB Username:     _________________
MongoDB Password:     _________________
MongoDB URL:          _________________

Railway Account:      _________________
Vercel Account:       _________________

Backend URL:          _________________
Frontend URL:         _________________
```

---

## 🔒 Security Notes

⚠️ Never commit:
- `.env` files
- Passwords
- Connection strings
- API keys

✅ Always use:
- Environment variables
- HTTPS in production
- Strong passwords
- IP restrictions (MongoDB)

---

**Print this card and keep it handy! 📄**

Last Updated: _______________
