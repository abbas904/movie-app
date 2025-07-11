import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app load
    const checkAuthStatus = () => {
      const loggedIn = AuthService.isLoggedIn();
      const user = AuthService.getCurrentUser();
      
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const result = AuthService.loginUser(email, password);
    
    if (result.success) {
      setIsLoggedIn(true);
      setCurrentUser(result.user);
    }
    
    return result;
  };

  const register = async (userData) => {
    const result = AuthService.registerUser(userData);
    return result;
  };

  const logout = () => {
    const result = AuthService.logoutUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    return result;
  };

  const updateProfile = async (userId, updatedData) => {
    const result = AuthService.updateUserProfile(userId, updatedData);
    
    if (result.success) {
      const updatedUser = AuthService.getCurrentUser();
      setCurrentUser(updatedUser);
    }
    
    return result;
  };

  const deleteAccount = async (email) => {
    const result = AuthService.deleteUserAccount(email);
    
    if (result.success) {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
    
    return result;
  };

  const value = {
    isLoggedIn,
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 