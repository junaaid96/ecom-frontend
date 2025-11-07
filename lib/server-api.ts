import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { cookies, headers } from 'next/headers';
import { API_BASE_URL } from '@/lib/config';

const TOKEN_STORAGE_KEY = 'auth_token';

const createServerClient = (): AxiosInstance => {
  const cookieStore = cookies();
  const headerStore = headers();
  const forwardedFor = headerStore.get('x-forwarded-for');
  
  // Get token from cookie
  const tokenCookie = cookieStore.get(TOKEN_STORAGE_KEY);
  const token = tokenCookie?.value;

  const headersConfig: Record<string, string | undefined> = {
    Accept: 'application/json',
    'X-Forwarded-For': forwardedFor ?? undefined
  };

  // Add Authorization header if token exists
  if (token) {
    headersConfig.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: API_BASE_URL,
    headers: headersConfig,
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status < 500
  });
};

export const serverApi = async <T>(request: (client: AxiosInstance) => Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> => {
  const client = createServerClient();
  return request(client);
};

export const buildServerApiUrl = (path: string) => `${API_BASE_URL}${path}`;

