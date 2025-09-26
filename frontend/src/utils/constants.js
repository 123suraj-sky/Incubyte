// Base URL for API requests. Override via frontend/.env REACT_APP_API_URL
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// API endpoint paths used by the services layer
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  PROFILE: '/api/auth/profile',
  SWEETS: '/api/sweets',
  INVENTORY: '/api/sweets'
};