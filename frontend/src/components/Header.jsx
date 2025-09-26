import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-primary-light to-primary-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Sweet Shop</Link>
        
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.username}</span>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-md bg-white text-primary-dark hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/auth" 
              className="px-4 py-2 rounded-md bg-white text-primary-dark hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;