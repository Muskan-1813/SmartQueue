import axios from 'axios';

// Use relative URL when in development (Vite proxy handles it)
// Use full URL in production or when VITE_API_URL is explicitly set
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use relative URL to leverage Vite proxy
  if (import.meta.env.DEV) {
    return '/api';
  }
  // Fallback for production
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.error('[API] Request error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      const baseURL = error.config?.baseURL || 'http://localhost:5000/api';
      const fullURL = `${baseURL}${error.config?.url || ''}`;
      console.error('[API] Network error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL,
        troubleshooting: [
          '1. Make sure the backend server is running',
          `2. Check if backend is accessible at: ${baseURL.replace('/api', '')}`,
          '3. Verify the backend is running on the correct port (default: 5000)',
          '4. Check for CORS issues in browser console',
          '5. Verify VITE_API_URL environment variable if set',
        ],
      });
    } else if (error.response) {
      // Server responded with error status
      console.error('[API] Server error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('[API] No response received:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
      });
    } else {
      // Something else happened
      console.error('[API] Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

