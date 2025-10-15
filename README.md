# Nubian Landing Page

A modern landing page with email subscription functionality for collecting waitlist signups.

## 🚀 **Want to Make This Live?**

👉 **[START HERE - Deployment Guide](./START_HERE.md)** 👈

Follow our step-by-step guide to deploy your site for FREE so you can share it with anyone!

---

## ✨ Features

- 🎨 Modern, responsive design with React and TailwindCSS
- 📧 Email subscription system with MongoDB backend
- ✅ Email validation and duplicate prevention
- 🔔 Success/error toast notifications
- 📱 Mobile-friendly UI
- 🚀 FastAPI backend with automatic API documentation
- 💾 MongoDB database for storing subscriber emails
- 🌍 **Deploy-ready** with Railway & Vercel

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Frontend │ ◄─────► │  FastAPI Backend │ ◄─────► │  MongoDB        │
│  (Port 3000)    │  HTTP   │  (Port 8000)     │         │  (Port 27017)   │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
      │                              │
      │                              │
      ├─ EmailSubscribeForm.jsx     ├─ POST /api/subscribe
      ├─ services/api.js            ├─ GET  /api/subscribers
      └─ ShadCN UI Components       └─ Pydantic Models
```

## 📁 Project Structure

```
Nubian-Landing/
├── backend/
│   ├── server.py                 # FastAPI server with email endpoints
│   ├── requirements.txt          # Python dependencies
│   ├── .env                      # Environment configuration
│   └── API_DOCUMENTATION.md      # Complete API docs
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── components/
│   │   │   ├── EmailSubscribeForm.jsx  # Email subscription component
│   │   │   └── ui/              # ShadCN UI components
│   │   └── pages/
│   │       └── Home.jsx         # Landing page
│   └── .env                     # Frontend environment config
├── START_HERE.md                # 👈 Start deployment here!
├── GO_LIVE_GUIDE.md             # Step-by-step deployment
├── QUICK_START.md               # Local development setup
├── IMPLEMENTATION_SUMMARY.md    # Implementation details
└── FRONTEND_INTEGRATION.md      # Integration guide
```

## 🚀 Getting Started

### 🌍 Want to Deploy? (Recommended)
**Make your site live and shareable in 30 minutes!**

👉 **[Follow the Deployment Guide](./START_HERE.md)** 👈

**You'll get:**
- ✅ Live website URL to share
- ✅ Free cloud database (MongoDB Atlas)
- ✅ Free backend hosting (Railway)
- ✅ Free frontend hosting (Vercel)
- ✅ $0/month cost!

### 💻 Want to Run Locally?

See [QUICK_START.md](QUICK_START.md) for detailed setup instructions.

**Quick Steps:**

1. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

2. **Start Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn server:app --reload --port 8000
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access:**
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8000/docs

---

## 📚 Documentation

### Deployment Guides
- 🌍 **[START_HERE.md](./START_HERE.md)** - Choose your deployment guide
- 🎯 **[GO_LIVE_GUIDE.md](./GO_LIVE_GUIDE.md)** - Detailed deployment steps
- 🎬 **[VIDEO_WALKTHROUGH.md](./VIDEO_WALKTHROUGH.md)** - Visual walkthrough
- ✅ **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Deployment checklist
- 🎯 **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference card

### Development Guides
- 🚀 **[QUICK_START.md](./QUICK_START.md)** - Local development setup
- 📖 **[backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)** - Complete API reference
- 🔗 **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - How to integrate the email form
- 📝 **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Overview of what was built

---

## 📧 Email Subscription API

### Subscribe an Email
```bash
POST /api/subscribe
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing! You'll be the first to know when we launch.",
  "already_subscribed": false
}
```

### Get All Subscribers
```bash
GET /api/subscribers
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "timestamp": "2025-10-15T10:30:00Z",
    "status": "subscribed"
  }
]
```

## 🛠️ Technologies

### Frontend
- React
- TailwindCSS
- ShadCN UI Components
- Sonner (Toast notifications)
- Lucide React (Icons)

### Backend
- FastAPI
- Pydantic (Data validation)
- Motor (Async MongoDB driver)
- Python-dotenv

### Database
- MongoDB

## 📖 Documentation

- [Quick Start Guide](QUICK_START.md) - Get up and running quickly
- [API Documentation](backend/API_DOCUMENTATION.md) - Complete API reference
- [Frontend Integration](FRONTEND_INTEGRATION.md) - How to integrate the email form
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md) - Overview of what was built

## 🎯 Usage

### Using the Email Subscribe Component

```jsx
import EmailSubscribeForm from '../components/EmailSubscribeForm';

function Home() {
  return (
    <div>
      <h1>Join Our Waitlist</h1>
      <EmailSubscribeForm />
    </div>
  );
}
```

### Using the API Service

```jsx
import { subscribeEmail } from '../services/api';

const result = await subscribeEmail('user@example.com');
if (result.success) {
  console.log(result.message);
}
```

## 🔐 Environment Configuration

### Backend (.env)
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="nubian_landing"
CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 🎨 Customization

The email subscription form can be easily customized:
- Styling: Edit `EmailSubscribeForm.jsx`
- Messages: Update success/error messages in the component
- Validation: Modify API validation in `backend/server.py`

## 📝 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```
