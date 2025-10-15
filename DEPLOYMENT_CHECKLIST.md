# 🚀 Deployment Checklist

Use this checklist to ensure your deployment is successful!

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] All code is committed to Git
- [ ] `.env` files are NOT committed (they're in `.gitignore`)
- [ ] Code is pushed to GitHub
- [ ] All dependencies are in `requirements.txt` and `package.json`

### Accounts Setup
- [ ] GitHub account created
- [ ] MongoDB Atlas account created
- [ ] Railway OR Render account created (backend)
- [ ] Vercel OR Netlify account created (frontend)

---

## 📊 Step 1: MongoDB Atlas Setup

- [ ] Created free cluster
- [ ] Database user created with password saved
- [ ] Network access set to "Allow from anywhere" (0.0.0.0/0)
- [ ] Connection string copied and password replaced
- [ ] Connection string format verified:
  ```
  mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
  ```

**Your Connection String:** ________________________________

---

## 🔧 Step 2: Backend Deployment (Railway)

- [ ] Railway account created and connected to GitHub
- [ ] New project created from GitHub repo
- [ ] Root directory set to `backend`
- [ ] Start command configured: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] Environment variables added:
  - [ ] `MONGO_URL` = (your MongoDB connection string)
  - [ ] `DB_NAME` = `nubian_landing`
  - [ ] `CORS_ORIGINS` = `*` (temporarily)
- [ ] Deployment successful (green checkmark)
- [ ] Domain generated
- [ ] Backend URL tested at `/docs` endpoint

**Your Backend URL:** ________________________________

**Test URL:** https://your-backend-url.railway.app/docs

---

## 🎨 Step 3: Frontend Deployment (Vercel)

- [ ] Vercel account created and connected to GitHub
- [ ] Project imported from GitHub
- [ ] Framework preset: Create React App
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Environment variable added:
  - [ ] `REACT_APP_API_URL` = `https://your-backend-url/api`
- [ ] Deployment successful
- [ ] Frontend URL copied

**Your Frontend URL:** ________________________________

---

## 🔗 Step 4: Connect Backend and Frontend

- [ ] Backend CORS_ORIGINS updated with frontend URL
- [ ] Backend redeployed with new CORS settings
- [ ] Frontend can communicate with backend

Update Railway `CORS_ORIGINS` to:
```
https://your-frontend.vercel.app,https://*.vercel.app
```

---

## 🧪 Step 5: Testing

### Test Backend API
- [ ] Open: `https://your-backend-url/docs`
- [ ] Swagger UI loads successfully
- [ ] Can expand `/api/subscribe` endpoint
- [ ] Can see endpoint documentation

### Test Email Subscription
- [ ] Open your frontend URL
- [ ] Email subscription form is visible
- [ ] Enter test email: `test@example.com`
- [ ] Click subscribe button
- [ ] Success message appears: "Thank you for subscribing!"
- [ ] Toast notification shows

### Test Duplicate Prevention
- [ ] Submit the same email again
- [ ] Message changes to: "You're already on the list!"

### Test Database
- [ ] Go to MongoDB Atlas
- [ ] Click "Browse Collections"
- [ ] Database `nubian_landing` exists
- [ ] Collection `email_subscriptions` exists
- [ ] Test email is stored with timestamp

### Test API Directly
```bash
# Subscribe test
curl -X POST "https://your-backend-url/api/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email": "test2@example.com"}'

# Get subscribers
curl "https://your-backend-url/api/subscribers"
```

---

## 🎯 Post-Deployment

### Security
- [ ] Update MongoDB network access to specific IPs (optional)
- [ ] CORS restricted to specific domains (not *)
- [ ] Environment variables secured
- [ ] No sensitive data in code

### Monitoring
- [ ] Railway deployment logs checked
- [ ] Vercel deployment logs checked
- [ ] MongoDB Atlas monitoring enabled
- [ ] Email subscriptions are being saved

### Documentation
- [ ] README updated with live URLs
- [ ] Team members have access
- [ ] Environment variables documented

---

## 📱 Optional: Custom Domain

### Frontend Custom Domain (Vercel)
- [ ] Domain purchased
- [ ] Domain added in Vercel settings
- [ ] DNS records updated
- [ ] SSL certificate issued (automatic)
- [ ] Custom domain working

### Backend Custom Domain (Railway)
- [ ] Subdomain chosen (e.g., api.yourdomain.com)
- [ ] Custom domain added in Railway
- [ ] DNS CNAME record updated
- [ ] SSL certificate issued (automatic)
- [ ] API accessible at custom domain

### Update After Custom Domains
- [ ] Frontend `.env.production` updated with new backend URL
- [ ] Backend `CORS_ORIGINS` updated with new frontend URL
- [ ] Both services redeployed
- [ ] Everything tested again

---

## 🎊 Launch Checklist

- [ ] All tests passing
- [ ] Database storing emails correctly
- [ ] Success messages working
- [ ] Error handling working
- [ ] Mobile responsive
- [ ] Loading states working
- [ ] Toast notifications appearing
- [ ] No console errors
- [ ] API documentation accessible

---

## 📊 Your Live URLs

**Frontend (Share this!):**
```
https://___________________________
```

**Backend API:**
```
https://___________________________
```

**API Documentation:**
```
https://___________________________/docs
```

**MongoDB Atlas:**
```
https://cloud.mongodb.com
```

---

## 🆘 Troubleshooting

### Issue: CORS Error
**Solution:** Update `CORS_ORIGINS` in Railway to include your Vercel URL

### Issue: API Not Found (404)
**Solution:** Check `REACT_APP_API_URL` ends with `/api`

### Issue: Database Connection Failed
**Solution:** Verify MongoDB connection string and network access

### Issue: Environment Variables Not Working
**Solution:** Redeploy after changing environment variables

### Issue: Build Failed
**Solution:** Check deployment logs for specific errors

---

## 📞 Support Resources

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://www.mongodb.com/docs/atlas
- **API Documentation:** https://your-backend-url/docs

---

## ✅ Final Confirmation

Once everything is checked:

- [ ] ✅ System is LIVE
- [ ] ✅ Emails are being collected
- [ ] ✅ Users can subscribe successfully
- [ ] ✅ URLs are shareable
- [ ] ✅ Everything is working!

---

## 🎉 Congratulations!

Your email subscription system is now **LIVE** and ready to collect subscribers!

**Share your link:**
```
https://your-frontend-url.vercel.app
```

**Monitor subscribers at:**
```
MongoDB Atlas Dashboard → Browse Collections
```

**Next Steps:**
1. Share your link on social media
2. Add to your marketing materials
3. Monitor subscriber growth
4. Export emails when ready to launch!

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Notes:**
_________________________________
_________________________________
_________________________________
