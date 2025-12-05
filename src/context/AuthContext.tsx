import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserType } from '../types';

interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: UserType;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUserType: (type: UserType) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: UserType;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEY = 'videohub_auth';
const USER_TYPE_KEY = 'videohub_user_type';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserTypeState] = useState<UserType>(() => {
    const stored = localStorage.getItem(USER_TYPE_KEY);
    return (stored as UserType) || 'agency';
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        if (parsed.user?.userType) {
          setUserTypeState(parsed.user.userType);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Persist userType changes
  useEffect(() => {
    localStorage.setItem(USER_TYPE_KEY, userType);
  }, [userType]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful login
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        userType,
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser }));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
  }, [userType]);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email: data.email,
      name: data.name,
      userType: data.userType,
    };

    setUser(mockUser);
    setUserTypeState(data.userType);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser }));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setUserType = useCallback((type: UserType) => {
    setUserTypeState(type);
    if (user) {
      const updatedUser = { ...user, userType: type };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: updatedUser }));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        userType,
        login,
        register,
        logout,
        setUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
