import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/lib/config';

const TOKEN_STORAGE_KEY = 'auth_token';

/**
 * Get JWT token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

/**
 * Sync token from localStorage to cookie (useful for existing sessions)
 */
export const syncTokenToCookie = (): void => {
  if (typeof window === 'undefined') return;
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    // Check if cookie already exists
    const cookies = document.cookie.split(';');
    const hasCookie = cookies.some(cookie => cookie.trim().startsWith(`${TOKEN_STORAGE_KEY}=`));
    if (!hasCookie) {
      // Set cookie if token exists in localStorage but not in cookie
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
      const isSecure = window.location.protocol === 'https:';
      const secureFlag = isSecure ? '; Secure' : '';
      document.cookie = `${TOKEN_STORAGE_KEY}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureFlag}`;
    }
  }
};

/**
 * Store JWT token in localStorage and cookie
 */
export const setToken = (token: string | null): void => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    // Set cookie for server-side access (7 days expiration)
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? '; Secure' : '';
    document.cookie = `${TOKEN_STORAGE_KEY}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureFlag}`;
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    // Remove cookie
    document.cookie = `${TOKEN_STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

const createBrowserClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
  });

  instance.interceptors.request.use((config) => {
    const headers = config.headers ?? {};
    (headers as Record<string, unknown>).Accept = 'application/json';
    
    // Only set Content-Type to application/json if data is not FormData
    // FormData requires multipart/form-data which Axios sets automatically with boundary
    if (!(config.data instanceof FormData)) {
      (headers as Record<string, unknown>)['Content-Type'] = 'application/json';
    }
    
    // Add JWT token to Authorization header if available
    const token = getToken();
    if (token) {
      (headers as Record<string, unknown>).Authorization = `Bearer ${token}`;
    }
    
    config.headers = headers;
    return config;
  });

  // Handle 401 responses - clear token and redirect to login
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Clear token on unauthorized response
        setToken(null);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const createServerClient = (): AxiosInstance => {
  throw new Error('createServerClient is only available on the server. Import serverApi from lib/server-api instead.');
};

export const apiClient = createBrowserClient();

export const fetcher = async <T>(url: string): Promise<T> => {
  const { data } = await apiClient.get<T>(url);
  return data;
};

export const buildApiUrl = (path: string) => `${API_BASE_URL}${path}`;

export default apiClient;

