# 🚀 Deployment Guide

## Production Deployment Checklist

### 1. Database Setup (MongoDB Atlas)

#### Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)

#### Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your database password

#### Create Database and Index
```javascript
// Connect to your cluster via mongosh or MongoDB Compass
use nubian_landing

// Create unique index on email field
db.email_subscriptions.createIndex({ "email": 1 }, { unique: true })
```

### 2. Backend Deployment (Options)

#### Option A: Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and initialize:**
   ```bash
   railway login
   railway init
   ```

3. **Create `railway.json`:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "uvicorn backend.server:app --host 0.0.0.0 --port $PORT",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

4. **Add environment variables on Railway dashboard:**
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `DB_NAME`: `nubian_landing`
   - `CORS_ORIGINS`: Your frontend URL (e.g., `https://yoursite.com`)

5. **Deploy:**
   ```bash
   railway up
   ```

#### Option B: Render

1. **Create `render.yaml`:**
   ```yaml
   services:
     - type: web
       name: nubian-backend
       env: python
       buildCommand: "pip install -r requirements.txt"
       startCommand: "uvicorn server:app --host 0.0.0.0 --port $PORT"
       envVars:
         - key: MONGO_URL
           sync: false
         - key: DB_NAME
           value: nubian_landing
         - key: CORS_ORIGINS
           sync: false
   ```

2. Push to GitHub and connect to Render
3. Add environment variables in Render dashboard

#### Option C: Heroku

1. **Create `Procfile`:**
   ```
   web: uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

2. **Deploy:**
   ```bash
   heroku create nubian-backend
   heroku config:set MONGO_URL="your-mongodb-connection-string"
   heroku config:set DB_NAME="nubian_landing"
   heroku config:set CORS_ORIGINS="https://yoursite.com"
   git push heroku main
   ```

### 3. Frontend Deployment

#### Option A: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Update `frontend/.env.production`:**
   ```env
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

3. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

4. **Add environment variable in Vercel dashboard:**
   - `REACT_APP_API_URL`: Your backend URL

#### Option B: Netlify

1. **Create `frontend/netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify CLI or GitHub integration**

3. **Add environment variable:**
   - `REACT_APP_API_URL`: Your backend URL

#### Option C: AWS Amplify

1. Connect your GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `build`
3. Add environment variable: `REACT_APP_API_URL`

### 4. Update CORS Origins

After deploying frontend, update backend environment:

```env
CORS_ORIGINS="https://yourfrontend.vercel.app,https://www.yourdomain.com"
```

### 5. Security Enhancements

#### Add Rate Limiting

```bash
pip install slowapi
```

Update `server.py`:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@api_router.post("/subscribe")
@limiter.limit("5/minute")  # 5 requests per minute
async def subscribe_email(request: Request, input: EmailSubscriptionCreate):
    # ... existing code
```

#### Enable HTTPS Only

All production deployments should use HTTPS. Most platforms (Vercel, Netlify, Railway, Render) provide free SSL certificates.

### 6. Monitoring and Analytics

#### Add Logging

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

@api_router.post("/subscribe")
async def subscribe_email(input: EmailSubscriptionCreate):
    logger.info(f"New subscription attempt: {input.email}")
    # ... existing code
```

#### Add Analytics

Consider adding:
- Google Analytics for frontend
- Sentry for error tracking
- LogRocket for session replay
- Mixpanel for event tracking

### 7. Environment Variables Summary

#### Backend (.env - Production)
```env
MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/"
DB_NAME="nubian_landing"
CORS_ORIGINS="https://yoursite.com,https://www.yoursite.com"
```

#### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### 8. Testing in Production

#### Test Endpoints
```bash
# Health check
curl https://api.yourdomain.com/api/

# Subscribe
curl -X POST "https://api.yourdomain.com/api/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Get subscribers
curl https://api.yourdomain.com/api/subscribers
```

### 9. Post-Deployment Tasks

- [ ] Test email subscription on production site
- [ ] Verify emails are being saved to MongoDB
- [ ] Test duplicate email detection
- [ ] Check CORS is working
- [ ] Verify rate limiting (if implemented)
- [ ] Set up monitoring alerts
- [ ] Create database backups
- [ ] Document API endpoints for team
- [ ] Set up CI/CD pipeline (optional)

### 10. Maintenance

#### Regular Tasks
- Monitor database size
- Check error logs
- Review subscription analytics
- Export subscriber list regularly
- Update dependencies monthly

#### Backup Strategy
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://..." --out=/backup

# Restore
mongorestore --uri="mongodb+srv://..." /backup
```

### 11. Scaling Considerations

When you get more subscribers:

1. **Database Indexes:**
   ```javascript
   db.email_subscriptions.createIndex({ "timestamp": -1 })
   db.email_subscriptions.createIndex({ "status": 1 })
   ```

2. **Caching:** Add Redis for frequently accessed data

3. **CDN:** Use Cloudflare or similar for frontend

4. **Load Balancing:** Multiple backend instances

### 12. Cost Estimates (Free Tier)

- **MongoDB Atlas:** Free (512 MB)
- **Railway/Render:** Free tier available
- **Vercel/Netlify:** Free for personal projects
- **Domain:** ~$10-15/year

**Total:** Can run for free initially, then ~$10-20/month as you scale

### 13. Custom Domain Setup

#### Frontend (Vercel)
1. Go to your project settings
2. Add custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

#### Backend (Railway)
1. Go to your service settings
2. Add custom domain
3. Update DNS CNAME record
4. Certificate auto-provisions

### 14. Email Service Integration (Future)

Consider integrating with:
- **SendGrid:** Email delivery service
- **Mailchimp:** Marketing automation
- **ConvertKit:** Email marketing
- **Customer.io:** Messaging platform

Example SendGrid integration:
```python
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_confirmation_email(email):
    message = Mail(
        from_email='hello@yourdomain.com',
        to_emails=email,
        subject='Welcome to Nubian!',
        html_content='<strong>Thank you for subscribing!</strong>'
    )
    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
```

---

## 🎉 Deployment Complete!

Your email subscription system is now live in production!

**Next Steps:**
1. Test thoroughly in production
2. Monitor for errors
3. Collect feedback
4. Iterate and improve

**Resources:**
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
