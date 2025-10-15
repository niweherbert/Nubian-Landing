# Email Subscription API Documentation

## Overview
This API provides endpoints for managing email subscriptions for the Nubian Web landing page waitlist.

## Base URL
```
http://localhost:8000/api
```

## Endpoints

### 1. Subscribe Email
Subscribe a user's email to the waitlist.

**Endpoint:** `POST /api/subscribe`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Validation:**
- Email must be a valid email format
- Email is automatically converted to lowercase for consistency

**Success Response (New Subscription):**
```json
{
  "success": true,
  "message": "Thank you for subscribing! You'll be the first to know when we launch.",
  "already_subscribed": false
}
```

**Success Response (Already Subscribed):**
```json
{
  "success": true,
  "message": "You're already on the list! You'll be the first to know when we launch.",
  "already_subscribed": true
}
```

**Error Response (Invalid Email):**
```json
{
  "detail": [
    {
      "type": "value_error",
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "input": "invalid-email"
    }
  ]
}
```

### 2. Get All Subscribers
Retrieve all email subscribers from the database.

**Endpoint:** `GET /api/subscribers`

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user1@example.com",
    "timestamp": "2025-10-15T10:30:00Z",
    "status": "subscribed"
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440001",
    "email": "user2@example.com",
    "timestamp": "2025-10-15T11:45:00Z",
    "status": "subscribed"
  }
]
```

## Database Schema

### Email Subscription Collection: `email_subscriptions`

**Fields:**
- `id` (string): Unique identifier (UUID v4)
- `email` (string): Subscriber's email address (lowercase, validated)
- `timestamp` (datetime): When the subscription was created (UTC)
- `status` (string): Subscription status (default: "subscribed")

**Indexes:**
- Email field should be unique to prevent duplicate subscriptions

## Setup Instructions

### Prerequisites
1. Python 3.9+
2. MongoDB installed and running

### Installation

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Create a `.env` file in the backend directory:
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="nubian_landing"
CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
```

3. Start MongoDB:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run directly
mongod --dbpath /path/to/data/db
```

4. Start the FastAPI server:
```bash
cd backend
uvicorn server:app --reload --port 8000
```

## Testing the API

### Using cURL

**Subscribe an email:**
```bash
curl -X POST "http://localhost:8000/api/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Get all subscribers:**
```bash
curl -X GET "http://localhost:8000/api/subscribers"
```

### Using the Interactive API Docs

FastAPI provides automatic interactive API documentation:

1. Start the server
2. Open your browser to: `http://localhost:8000/docs`
3. You can test all endpoints directly from the Swagger UI

Alternative ReDoc documentation: `http://localhost:8000/redoc`

## Frontend Integration Example

### JavaScript/React Example

```javascript
// Subscribe email function
async function subscribeEmail(email) {
  try {
    const response = await fetch('http://localhost:8000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(data.message);
      // Show success message to user
      alert(data.message);
    }
  } catch (error) {
    console.error('Subscription error:', error);
    alert('Failed to subscribe. Please try again.');
  }
}

// Usage in a form
document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  await subscribeEmail(email);
});
```

### Fetch API Example with Error Handling

```javascript
async function subscribeEmail(email) {
  try {
    const response = await fetch('http://localhost:8000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail[0]?.msg || 'Invalid email address');
    }
    
    const data = await response.json();
    return {
      success: true,
      message: data.message,
      alreadySubscribed: data.already_subscribed
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
```

## Features

✅ **Email Validation**: Uses Pydantic's EmailStr for robust email validation  
✅ **Duplicate Prevention**: Checks for existing emails before creating new subscriptions  
✅ **Friendly Messages**: Returns user-friendly success messages  
✅ **Lowercase Normalization**: Emails are stored in lowercase to prevent case-sensitive duplicates  
✅ **Timestamp Tracking**: Each subscription includes a UTC timestamp  
✅ **RESTful Design**: Clean, predictable API endpoints  
✅ **Auto-generated Documentation**: Swagger UI and ReDoc available  
✅ **Type Safety**: Full type hints and Pydantic models  
✅ **MongoDB Integration**: Scalable NoSQL database storage  

## Security Considerations

1. **CORS**: Configure `CORS_ORIGINS` in `.env` to only allow trusted domains in production
2. **Rate Limiting**: Consider adding rate limiting to prevent abuse
3. **Email Verification**: For production, implement email verification
4. **Data Privacy**: Ensure GDPR/privacy compliance for email storage
5. **HTTPS**: Always use HTTPS in production

## Next Steps

Consider implementing:
- Email verification with confirmation links
- Unsubscribe functionality
- Admin dashboard to view and export subscribers
- Email notifications when someone subscribes
- Integration with email marketing platforms (Mailchimp, SendGrid, etc.)
- Rate limiting to prevent spam
- Honeypot fields to prevent bot submissions
