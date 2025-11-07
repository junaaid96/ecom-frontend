'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@/types';
import { apiClient, setToken, syncTokenToCookie } from '@/lib/api';

type AuthResponse = {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuth = create<AuthState>()(
  devtools((set, get) => ({
    user: null,
    isLoading: false,
    isHydrated: false,
    hydrate: async () => {
      // Prevent multiple simultaneous hydration calls
      if (get().isLoading) return;
      
      // Sync token from localStorage to cookie for server-side access
      syncTokenToCookie();
      
      set({ isLoading: true });
      try {
        const { data } = await apiClient.get<User>('/auth/me');
        set({ user: data, isLoading: false, isHydrated: true });
      } catch (error) {
        // 401 is expected when not authenticated - silently fail
        set({ user: null, isLoading: false, isHydrated: true });
      }
    },
    login: async (email, password) => {
      set({ isLoading: true });
      try {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
        // Store the JWT token
        setToken(data.token);
        // Fetch user details with the new token
        const { data: userData } = await apiClient.get<User>('/auth/me');
        set({ user: userData, isLoading: false });
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },
    register: async (payload) => {
      set({ isLoading: true });
      try {
        const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
        // Store the JWT token
        setToken(data.token);
        // Fetch user details with the new token
        const { data: userData } = await apiClient.get<User>('/auth/me');
        set({ user: userData, isLoading: false });
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },
    logout: async () => {
      set({ isLoading: true });
      try {
        await apiClient.post('/auth/logout');
      } catch (error) {
        // Continue with logout even if API call fails
      } finally {
        // Clear token and user state
        setToken(null);
        set({ user: null, isLoading: false });
      }
    }
  }))
);

export default useAuth;

