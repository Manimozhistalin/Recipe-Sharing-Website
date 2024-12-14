import { useState } from 'react';
import { User, AuthState } from '../types/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const signIn = (email: string, password: string) => {
    // Simulate authentication
    const user: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    setAuthState({ user, isAuthenticated: true });
  };

  const signUp = (name: string, email: string, password: string) => {
    // Simulate registration
    const user: User = {
      id: '1',
      email,
      name,
    };
    setAuthState({ user, isAuthenticated: true });
  };

  const signOut = () => {
    setAuthState({ user: null, isAuthenticated: false });
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
}