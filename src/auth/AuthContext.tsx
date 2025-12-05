import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser, 
  fetchUserAttributes, 
  confirmSignUp, 
  resetPassword, 
  confirmResetPassword,
} from 'aws-amplify/auth';

import type {
  SignInInput,
  SignUpInput,
  ConfirmSignUpInput,
  ResetPasswordOutput,
  ResetPasswordInput,
  ConfirmResetPasswordInput,
  AuthUser,
  FetchUserAttributesOutput
} from 'aws-amplify/auth';

import { configureAmplify } from './amplify-config';

// Initialize Amplify
configureAmplify();

interface AuthContextType {
  user: AuthUser | null;
  userAttributes: FetchUserAttributesOutput | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (input: SignInInput) => Promise<any>;
  register: (input: SignUpInput) => Promise<any>;
  logout: () => Promise<void>;
  confirmRegister: (input: ConfirmSignUpInput) => Promise<any>;
  forgotPassword: (input: ResetPasswordInput) => Promise<ResetPasswordOutput>;
  confirmNewPassword: (input: ConfirmResetPasswordInput) => Promise<void>;
  checkUser: () => Promise<void>;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userAttributes, setUserAttributes] = useState<FetchUserAttributesOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkUser = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
      } catch (attrErr) {
        console.warn('Error fetching user attributes', attrErr);
      }
    } catch (err) {
      console.log('No authenticated user', err);
      setUser(null);
      setUserAttributes(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (input: SignInInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn(input);
      await checkUser();
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      setLoading(false);
      throw err;
    }
  };

  const register = async (input: SignUpInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUp(input);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      setLoading(false);
      throw err;
    }
  };

  const confirmRegister = async (input: ConfirmSignUpInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await confirmSignUp(input);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to confirm sign up');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut();
      setUser(null);
      setUserAttributes(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (input: ResetPasswordInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resetPassword(input);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to initiate password reset');
      setLoading(false);
      throw err;
    }
  };

  const confirmNewPassword = async (input: ConfirmResetPasswordInput) => {
    setLoading(true);
    setError(null);
    try {
      await confirmResetPassword(input);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to confirm new password');
      setLoading(false);
      throw err;
    }
  };

  const value = {
    user,
    userAttributes,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    confirmRegister,
    forgotPassword,
    confirmNewPassword,
    checkUser,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
