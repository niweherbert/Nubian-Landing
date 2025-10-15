# Frontend Integration Guide

## Integrating Email Subscription with Your React Frontend

### Step 1: Create an API Service

Create a new file: `frontend/src/services/api.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const subscribeEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail?.[0]?.msg || 'Invalid email address');
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
      message: error.message || 'Failed to subscribe. Please try again.'
    };
  }
};

export const getSubscribers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscribers');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
};
```

### Step 2: Update Your Home Component

Update `frontend/src/pages/Home.jsx` to use the API:

```jsx
import React, { useState } from 'react';
import { subscribeEmail } from '../services/api';
import { toast } from 'sonner';  // Assuming you have sonner for toasts

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        toast.success(result.message);
        setEmail(''); // Clear the input
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Your existing content */}
      
      <section className="waitlist-section py-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Join the Waitlist
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Be the first to know when we launch!
        </p>
        
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
```

### Step 3: Environment Configuration

Create or update `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

For production, update to your production API URL:

```env
REACT_APP_API_URL=https://api.yourdomian.com/api
```

### Step 4: Alternative Implementation with ShadcN UI Components

If you want to use your existing UI components:

```jsx
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { subscribeEmail } from '../services/api';

export default function EmailSubscribeForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await subscribeEmail(email);
    
    if (result.success) {
      toast.success(result.message, {
        description: result.alreadySubscribed 
          ? "You're already on our list!" 
          : "Check your inbox for confirmation",
      });
      if (!result.alreadySubscribed) {
        setEmail('');
      }
    } else {
      toast.error('Subscription failed', {
        description: result.message,
      });
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        We'll notify you when we launch. No spam, ever.
      </p>
    </form>
  );
}
```

### Step 5: Add Toast Notifications

Make sure you have the Toaster component in your app. Update `frontend/src/App.js`:

```jsx
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      {/* Your existing routes */}
      <Toaster position="top-right" />
    </>
  );
}
```

### Step 6: Testing

1. Start your backend server:
   ```bash
   cd backend
   python3 -m uvicorn server:app --reload --port 8000
   ```

2. Start your frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Test the email subscription:
   - Enter a valid email
   - Click subscribe
   - You should see a success toast message
   - Try subscribing with the same email again - you should see the "already subscribed" message

### Error Handling

The API handles:
- ✅ Invalid email format
- ✅ Duplicate emails
- ✅ Server errors
- ✅ Network errors

All errors are gracefully handled and displayed to the user with friendly messages.

### Success Messages

**New Subscription:**
> "Thank you for subscribing! You'll be the first to know when we launch."

**Already Subscribed:**
> "You're already on the list! You'll be the first to know when we launch."

### Next Steps

1. Style the form to match your design
2. Add email verification (optional)
3. Create an admin panel to view subscribers
4. Add analytics tracking for subscriptions
5. Implement unsubscribe functionality
