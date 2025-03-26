import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkLoginStatus = () => {
      const savedUser = localStorage.getItem('user');
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';

      if (isAuth && savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    };

    checkLoginStatus();
  }, []);

  // Save authentication state to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [user, isAuthenticated]);

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/');
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    // Redirect to login page
    navigate('/login');
  };

  // Context value to be provided
  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;