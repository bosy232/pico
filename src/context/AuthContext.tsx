import React, { createContext, useContext, useState } from 'react';
import type { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Valid users database
const VALID_USERS = {
  bothayna: {
    id: '1',
    username: 'bothayna',
    password: 'pico!@#456',
    role: 'admin' as const,
    permissions: [
      { id: '1', name: 'view_data_1_2', description: 'Access to Data Sources 1 & 2' },
      { id: '2', name: 'manage_users', description: 'Can manage users' },
    ],
    allowedDataSources: [1, 2],
  },
  muhannad: {
    id: '2',
    username: 'muhannad',
    password: 'pico!@#456',
    role: 'admin' as const,
    permissions: [
      { id: '3', name: 'view_data_3_4', description: 'Access to Data Sources 3 & 4' },
      { id: '4', name: 'manage_users', description: 'Can manage users' },
    ],
    allowedDataSources: [3, 4],
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (username: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = VALID_USERS[username as keyof typeof VALID_USERS];
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      const { password: _, ...userWithoutPassword } = user;
      
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};