# 🌐 Go Live Guide - Step by Step

Let's deploy your email subscription system so you can share it with anyone!

## 📋 What You'll Need

1. ✅ GitHub account (free)
2. ✅ MongoDB Atlas account (free)
3. ✅ Railway OR Render account (free) - for backend
4. ✅ Vercel OR Netlify account (free) - for frontend

**Estimated Time:** 30-45 minutes  
**Cost:** $0 (all free tiers)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database) - 10 minutes

### 1.1 Create Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google or email (it's free!)
3. Choose "Free Shared" tier (M0)

### 1.2 Create a Cluster
1. Choose a cloud provider: **AWS** (recommended)
2. Select region closest to you (e.g., **us-east-1** or **eu-west-1**)
3. Click **"Create"**
4. Wait 3-5 minutes for cluster creation

### 1.3 Set Up Database Access
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `nubian_admin`
5. Password: Click "Autogenerate Secure Password" and **SAVE IT!** 📝
6. User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Set Up Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

⚠️ **Important:** For production, you'll want to restrict this later to specific IPs.

### 1.5 Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **Driver: Python**, **Version: 3.12 or later**
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://nubian_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the password you saved earlier
7. **Save this connection string!** 📝

---

## Step 2: Deploy Backend to Railway - 15 minutes

Railway is the easiest option for deploying Python backends.

### 2.1 Create Railway Account
1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub (easiest)

### 2.2 Push Code to GitHub (if not already)
```bash
cd /Users/_n.herbert/Documents/Projects/Nubianweb/Nubian-Landing
git add .
git commit -m "Add email subscription feature"
git push origin update/landing
```

### 2.3 Create Railway Project
1. Click **"New Project"**
2. Choose **"Deploy from GitHub repo"**
3. Select your **Nubian-Landing** repository
4. Railway will auto-detect Python

### 2.4 Configure Build Settings
1. Click on your deployment
2. Go to **"Settings"** tab
3. Under **"Build"**, set:
   - **Root Directory:** `backend`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`

### 2.5 Add Environment Variables
1. Go to **"Variables"** tab
2. Click **"Add Variable"** for each:

   **MONGO_URL**
   ```
   mongodb+srv://nubian_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   *(Use your connection string from Step 1.5)*

   **DB_NAME**
   ```
   nubian_landing
   ```

   **CORS_ORIGINS**
   ```
   *
   ```
   *(We'll update this after deploying frontend)*

3. Click **"Deploy"**

### 2.6 Get Backend URL
1. Wait for deployment to complete (2-3 minutes)
2. Go to **"Settings"** > **"Networking"**
3. Click **"Generate Domain"**
4. Copy your backend URL (e.g., `https://nubian-backend-production.up.railway.app`)
5. **Save this URL!** 📝

### 2.7 Test Your Backend
Open in browser:
```
https://your-backend-url.railway.app/docs
```

You should see the Swagger API documentation! 🎉

---

## Step 3: Deploy Frontend to Vercel - 10 minutes

### 3.1 Create Vercel Account
1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub

### 3.2 Deploy Frontend
1. Click **"Add New..."** > **"Project"**
2. Import your **Nubian-Landing** repository
3. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### 3.3 Add Environment Variable
1. Before deploying, click **"Environment Variables"**
2. Add:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-url.railway.app/api`
     *(Use your Railway URL from Step 2.6)*
3. Click **"Add"**

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build and deployment
3. You'll get a URL like: `https://nubian-landing.vercel.app`
4. **Save this URL!** 📝

---

## Step 4: Update CORS Settings - 5 minutes

Now that frontend is deployed, we need to tell the backend to accept requests from it.

### 4.1 Update Backend CORS
1. Go back to **Railway**
2. Click on your backend project
3. Go to **"Variables"** tab
4. Edit **CORS_ORIGINS** variable:
   ```
   https://nubian-landing.vercel.app,https://*.vercel.app
   ```
   *(Use your actual Vercel URL)*
5. Railway will auto-redeploy (wait 1-2 minutes)

---

## Step 5: Test Your Live Site! 🎉

### 5.1 Open Your Frontend
Visit: `https://nubian-landing.vercel.app` (your Vercel URL)

### 5.2 Test Email Subscription
1. Find your email subscription form
2. Enter a test email
3. Click subscribe
4. You should see: **"Thank you for subscribing! You'll be the first to know when we launch."**

### 5.3 Verify Database
1. Go to MongoDB Atlas
2. Click **"Browse Collections"**
3. You should see `nubian_landing` > `email_subscriptions`
4. Your test email should be there! ✅

### 5.4 Test Duplicate Prevention
1. Submit the same email again
2. You should see: **"You're already on the list! You'll be the first to know when we launch."**

---

## 🎊 You're Live!

**Share your link:**
```
https://nubian-landing.vercel.app
```

Anyone in the world can now visit your site and subscribe!

---

## 📱 Optional: Add Custom Domain

### Vercel (Frontend)
1. Go to your project **Settings** > **Domains**
2. Add your custom domain (e.g., `nubian.com`)
3. Update DNS records as instructed
4. SSL certificate is automatic!

### Railway (Backend)
1. Go to **Settings** > **Networking**
2. Add custom domain (e.g., `api.nubian.com`)
3. Update DNS CNAME record
4. SSL certificate is automatic!

Then update:
- **Frontend env:** `REACT_APP_API_URL=https://api.nubian.com/api`
- **Backend CORS:** Add your custom domain

---

## 🔧 Quick Troubleshooting

### Email subscription not working?
1. Check browser console for errors
2. Verify backend is running: `https://your-backend.railway.app/docs`
3. Check CORS settings include your frontend URL
4. Verify MongoDB connection string is correct

### Backend won't start?
1. Check Railway logs for errors
2. Verify all environment variables are set
3. Check MongoDB Atlas allows connections from anywhere

### Frontend shows API error?
1. Verify `REACT_APP_API_URL` is set correctly
2. Must include `/api` at the end
3. Check backend is actually running

---

## 💰 Costs

**Everything is FREE!**
- MongoDB Atlas: Free tier (512MB storage)
- Railway: Free tier ($5/month credit)
- Vercel: Free for personal projects

You can run this for **$0/month** until you get significant traffic!

---

## 🎯 What's Next?

Now that you're live, you can:
1. ✅ Share your link on social media
2. ✅ Add email subscription form to your landing page
3. ✅ Monitor subscribers in MongoDB Atlas
4. ✅ Export subscriber list anytime
5. ✅ Add custom domain (optional)

**Your URLs:**
- **Live Site:** `https://your-site.vercel.app`
- **API Docs:** `https://your-backend.railway.app/docs`
- **Database:** MongoDB Atlas dashboard

---

## 🆘 Need Help?

If you get stuck:
1. Check Railway logs for backend errors
2. Check Vercel deployment logs for frontend errors
3. Test API directly at `/docs` endpoint
4. Verify environment variables are set correctly

**Common Issues:**
- ❌ **CORS error:** Update CORS_ORIGINS in Railway
- ❌ **API not found:** Check REACT_APP_API_URL has `/api` at end
- ❌ **Database error:** Verify MongoDB connection string

---

## 🎉 Success!

Congratulations! Your email subscription system is now **LIVE** and accessible to anyone in the world!

Share your link and start collecting subscribers! 🚀
