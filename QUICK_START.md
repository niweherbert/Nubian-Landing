# 🚀 Quick Start Guide - Email Subscription System

## Prerequisites

Before you start, make sure you have:
- ✅ Python 3.9+ installed
- ✅ Node.js and npm installed
- ✅ MongoDB installed (or use MongoDB Atlas)

## Step 1: Install MongoDB (if not installed)

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Verify MongoDB is running
```bash
mongosh
# You should see MongoDB shell
# Type 'exit' to quit
```

## Step 2: Set Up Backend

### Install Python dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Verify .env file exists
The `.env` file should already be in `backend/.env` with:
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="nubian_landing"
CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
```

### Start the backend server
```bash
cd backend
uvicorn server:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Test the API
Open http://localhost:8000/docs in your browser - you'll see the interactive API documentation!

## Step 3: Set Up Frontend

### The .env file has been updated
The `frontend/.env` file now includes:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

### Install frontend dependencies (if not done)
```bash
cd frontend
npm install
```

### Start the frontend
```bash
cd frontend
npm start
```

## Step 4: Use the Email Subscribe Component

### Option 1: Use the Ready-Made Component

Add to your `Home.jsx` or any page:

```jsx
import EmailSubscribeForm from '../components/EmailSubscribeForm';

function Home() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-4">
        Join Our Waitlist
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Be the first to know when we launch!
      </p>
      
      <EmailSubscribeForm />
    </div>
  );
}
```

### Option 2: Use the API Service Directly

```jsx
import { subscribeEmail } from '../services/api';
import { useState } from 'react';

function MyComponent() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await subscribeEmail(email);
    
    if (result.success) {
      alert(result.message);
      setEmail('');
    } else {
      alert(result.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

## Step 5: Test the Complete Flow

1. **Start both servers:**
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000` or `http://localhost:5173`

2. **Test subscription:**
   - Go to your frontend
   - Enter an email address
   - Click subscribe
   - You should see: "Thank you for subscribing! You'll be the first to know when we launch."

3. **Test duplicate prevention:**
   - Enter the same email again
   - You should see: "You're already on the list! You'll be the first to know when we launch."

4. **View subscribers:**
   - Go to http://localhost:8000/docs
   - Click on `GET /api/subscribers`
   - Click "Try it out"
   - Click "Execute"
   - You'll see all subscribed emails

## 🎯 What You Can Do Now

### View All Subscribers
```bash
curl http://localhost:8000/api/subscribers
```

### Subscribe via API
```bash
curl -X POST "http://localhost:8000/api/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Check API Status
```bash
curl http://localhost:8000/api/
```

## 📊 MongoDB Database

### View your data in MongoDB
```bash
mongosh
use nubian_landing
db.email_subscriptions.find().pretty()
```

### Create a unique index on email (recommended)
```bash
mongosh
use nubian_landing
db.email_subscriptions.createIndex({ "email": 1 }, { unique: true })
```

## 🐛 Troubleshooting

### MongoDB not running
```bash
brew services start mongodb-community
```

### Port 8000 already in use
```bash
lsof -ti:8000 | xargs kill -9
```

### Backend can't connect to MongoDB
Check if MongoDB is running:
```bash
brew services list | grep mongodb
```

### Frontend can't connect to backend
- Make sure backend is running on port 8000
- Check `frontend/.env` has `REACT_APP_API_URL=http://localhost:8000/api`
- Restart frontend after changing .env

### CORS errors
Update `backend/.env`:
```env
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,*"
```

## 📚 Documentation Files

- `IMPLEMENTATION_SUMMARY.md` - Complete overview of what was built
- `backend/API_DOCUMENTATION.md` - Detailed API documentation
- `FRONTEND_INTEGRATION.md` - Frontend integration guide
- `QUICK_START.md` - This file

## ✅ Success Checklist

- [ ] MongoDB is running
- [ ] Backend server is running on port 8000
- [ ] Frontend is running
- [ ] Can access API docs at http://localhost:8000/docs
- [ ] Email subscription form is visible on frontend
- [ ] Can submit an email and see success message
- [ ] Duplicate emails are detected
- [ ] Can view subscribers in API docs

## 🎉 You're Ready!

Your email subscription system is now live! Users can subscribe to your waitlist and you'll get a list of all emails in your MongoDB database.

**Next Steps:**
1. Customize the EmailSubscribeForm component to match your design
2. Add the form to your landing page
3. Test thoroughly
4. Deploy to production when ready!

---

**Need Help?**
- Check the API docs: http://localhost:8000/docs
- Review `IMPLEMENTATION_SUMMARY.md` for detailed info
- Check `backend/API_DOCUMENTATION.md` for API details
