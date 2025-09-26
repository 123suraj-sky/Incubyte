/**
 * AuthPage provides a toggle between Login and Register flows.
 * Redirects to the dashboard if already authenticated.
 */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 text-white opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-32 text-white opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome to Sweet Shop</h1>
          <p className="text-white opacity-90">Your delicious adventure awaits</p>
        </div>

        <div className="glass-card-dark p-8 rounded-3xl shadow-2xl">
          {isLogin ? (
            <LoginForm
              onSuccess={() => { }}
              switchToRegister={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm
              switchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;