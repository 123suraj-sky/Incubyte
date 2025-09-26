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
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!showAdminQuick && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary-light to-primary-dark hover:from-primary-dark hover:to-primary-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
            </button>
          </div>
        </form>
      )}

      <div className="text-center mt-4">
        <div className="flex flex-col gap-2 mb-3">
          {!showAdminQuick ? (
            <button
              type="button"
              onClick={() => setShowAdminQuick(true)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
            >
              As Admin
            </button>
          ) : (
            <div className="space-y-2">
              <div className="text-left text-sm text-gray-600">Admin login</div>
              <input
                type="text"
                placeholder="Enter admin username (admin1 or admin2)"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Enter admin password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => quickLogin({ username, password })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
              >
                Sign in as Admin
              </button>
              <button
                type="button"
                onClick={() => setShowAdminQuick(false)}
                className="w-full px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Back to User Login
              </button>
            </div>
          )}
        </div>
        <button
          onClick={switchToRegister}
          className="text-primary-dark hover:text-primary-light text-sm"
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;