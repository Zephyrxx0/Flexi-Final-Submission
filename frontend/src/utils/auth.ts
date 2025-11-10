// MongoDB Authentication with JWT
const API_BASE_URL = 'http://localhost:3001/api';

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

interface AuthError {
  error: string;
}

// Helper function to handle API responses
const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = data as AuthError;
    throw new Error(error.error || 'Authentication failed');
  }
  return data;
};

// Sign Up with MongoDB
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data: AuthResponse = await handleApiResponse(response);
    
    // Store JWT token in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    console.log('Sign Up Successful:', data.user);
    return data.user;
  } catch (error: any) {
    console.error('Sign up error:', error.message);
    throw error;
  }
};

// Log In with MongoDB
export const logIn = async (email: string, password: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data: AuthResponse = await handleApiResponse(response);
    
    // Store JWT token in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    console.log('Log-in successful:', data.user);
    return data.user;
  } catch (error: any) {
    console.error('Login Error:', error.message);
    throw error;
  }
};

// Log Out
export const logOut = async (): Promise<void> => {
  try {
    // Clear JWT token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart on logout
    
    console.log('Log out successful');
  } catch (error: any) {
    console.error('Logout Error:', error.message);
    throw error;
  }
};

// Get stored auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get stored user
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Verify token with backend
export const verifyToken = async (): Promise<User | null> => {
  try {
    const token = getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Token is invalid, clear storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Update user profile (placeholder - will need backend endpoint)
export const updateProfile = async (user: User, updates: { displayName?: string }): Promise<void> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No authentication token');

    // For now, just update localStorage until backend endpoint is created
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    console.log('Profile updated locally:', updates);
    // TODO: Implement actual backend call to update user profile
  } catch (error: any) {
    console.error('Update profile error:', error.message);
    throw error;
  }
};



