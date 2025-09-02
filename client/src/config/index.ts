/**
 * Application configuration
 * This file centralizes all configuration variables for the application
 */

// API configuration
export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: 'http://localhost:3000/api',
  
  // API timeout in milliseconds (10 seconds)
  TIMEOUT: 10000,
  
  // Common API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
    },
    TASKS: {
      BASE: '/tasks',
      BY_ID: (id: string) => `/tasks/${id}`,
    },
    USERS: {
      PROFILE: '/users/profile',
    }
  }
};

// Application settings
export const APP_CONFIG = {
  // App name for display
  APP_NAME: 'TaskFlow',
  
  // Local storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'token',
    USER_DATA: 'user',
    THEME: 'theme',
  }
};
