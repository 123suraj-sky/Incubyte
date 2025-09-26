/**
 * LoginForm handles user authentication via username/password.
 *
 * @param {Object} props
 * @param {() => void} [props.onSuccess] - Callback after successful login.
 * @param {() => void} props.switchToRegister - Switches to registration form.
 */
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const LoginForm = ({ onSuccess, switchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminQuick, setShowAdminQuick] = useState(false);
  const { login, loading, error } = useAuth();

  // Submit user login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  // Quick admin login using provided credentials
  const quickLogin = async (creds) => {
    const success = await login(creds.username, creds.password);
    if (success && onSuccess) onSuccess();
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Login
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </div>
      )}

      {!showAdminQuick && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2" htmlFor="username">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Username
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2" htmlFor="password">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-700 leading-tight focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-light to-primary-dark hover:from-primary-dark hover:to-primary-light text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-light focus:ring-opacity-30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <LoadingSpinner size="sm" /> : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign In
              </>
            )}
          </button>
        </form>
      )}

      <div className="text-center mt-6 space-y-4">
        <div className="flex flex-col gap-3">
          {!showAdminQuick ? (
            <button
              type="button"
              onClick={() => setShowAdminQuick(true)}
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Login as Admin
            </button>
          ) : (
            <div className="space-y-3 slide-in">
              <div className="text-left text-sm text-gray-600 font-medium">Admin Login</div>
              <input
                type="text"
                placeholder="Enter admin username (admin1 or admin2)"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
              />
              <input
                type="password"
                placeholder="Enter admin password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-light focus:ring-4 focus:ring-primary-light focus:ring-opacity-20 transition-all duration-300"
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => quickLogin({ username, password })}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign in as Admin
              </button>
              <button
                type="button"
                onClick={() => setShowAdminQuick(false)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Back to User Login
              </button>
            </div>
          )}
        </div>
        <button
          onClick={switchToRegister}
          className="text-white hover:text-yellow-300 text-sm font-medium transition-colors duration-300 flex items-center justify-center gap-1 mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;