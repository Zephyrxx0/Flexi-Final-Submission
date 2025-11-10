// TODO: Replace with MongoDB + JWT authentication
// This file will be replaced with Express.js API calls

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

// Placeholder functions - these will make API calls to MongoDB backend
export const signUp = async (email: string, password: string): Promise<User> => {
  // TODO: Make API call to /api/auth/signup
  console.log("TODO: Implement MongoDB signup");
  throw new Error("MongoDB authentication not yet implemented");
};

export const logIn = async (email: string, password: string): Promise<User> => {
  // TODO: Make API call to /api/auth/login
  console.log("TODO: Implement MongoDB login");
  throw new Error("MongoDB authentication not yet implemented");
};

export const logOut = async (): Promise<void> => {
  // TODO: Clear JWT token from localStorage
  console.log("TODO: Implement MongoDB logout");
  throw new Error("MongoDB authentication not yet implemented");
};



