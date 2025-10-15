// API Service for Nubian Landing Backend
// This file contains all API calls for the application

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Subscribe an email to the waitlist
 * @param {string} email - The email address to subscribe
 * @returns {Promise<{success: boolean, message: string, alreadySubscribed?: boolean}>}
 */
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
      // Handle validation errors from FastAPI
      if (error.detail && Array.isArray(error.detail)) {
        throw new Error(error.detail[0]?.msg || 'Invalid email address');
      }
      throw new Error(error.message || 'Failed to subscribe');
    }
    
    const data = await response.json();
    return {
      success: true,
      message: data.message,
      alreadySubscribed: data.already_subscribed
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: error.message || 'Failed to subscribe. Please try again.'
    };
  }
};

/**
 * Get all subscribers (admin function)
 * @returns {Promise<Array>} Array of subscriber objects
 */
export const getSubscribers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscribers');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw error;
  }
};

/**
 * Check API health status
 * @returns {Promise<{message: string}>}
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    
    if (!response.ok) {
      throw new Error('API is not responding');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default {
  subscribeEmail,
  getSubscribers,
  checkHealth
};
