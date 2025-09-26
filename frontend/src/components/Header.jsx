/**
 * Header component that displays the app title and auth-aware actions.
 *
 * - Shows Login link when unauthenticated
 * - Shows current username and Logout button when authenticated
 */
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
  // Access user session and logout action from auth hook
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-primary-light to-primary-dark text-white shadow-xl fade-in">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold hover:scale-105 transition-transform duration-300">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Sweet Shop
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium">Welcome, {user.username}</span>
              </div>
              <button
                onClick={logout}
                className="px-6 py-2 rounded-lg bg-white text-primary-dark hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-6 py-2 rounded-lg bg-white text-primary-dark hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;