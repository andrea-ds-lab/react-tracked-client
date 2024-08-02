import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define types for user and context values
interface User {
  id: string;
  email: string;
  // Add other properties as needed
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { },
  logout: () => { },
});

// Define props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Utility function to parse JWT
const parseJwt = (token: string): User | null => {
  try {
    // Split the token into its parts
    const base64Url = token.split('.')[1];
    // Decode base64Url to base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decode base64 to a UTF-8 string
    const jsonString = atob(base64);
    // Parse the JSON string
    const decoded = JSON.parse(jsonString) as User;
    return decoded;
  } catch (error) {
    console.error('Failed to parse JWT', error);
    return null;
  }
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      setUser(decoded);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>('http://localhost:4000/api/login', { user: { email, password } });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = parseJwt(token);
      setUser(decoded);
    } catch (error: any) {
      // Check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.message);
        console.error('Config:', error.config);
        console.error('Response:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
