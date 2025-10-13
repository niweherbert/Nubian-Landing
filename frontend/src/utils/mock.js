// Mock data storage for email signups (frontend only)
const emailSignups = [];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock email signup function
export const mockEmailSignup = async (email) => {
  await delay(800); // Simulate network delay
  
  // Check if email already exists
  const exists = emailSignups.find(signup => signup.email === email);
  if (exists) {
    throw new Error('Email already registered');
  }
  
  // Add email to mock database
  const signup = {
    id: Date.now(),
    email,
    timestamp: new Date().toISOString()
  };
  
  emailSignups.push(signup);
  console.log('Mock Email Signup:', signup);
  console.log('Total Signups:', emailSignups.length);
  
  return signup;
};

// Get all signups (for testing)
export const getMockSignups = () => {
  return [...emailSignups];
};