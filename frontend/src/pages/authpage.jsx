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
    <div className="min-h-screen bg-gradient-to-r from-primary-light to-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm 
            onSuccess={() => {}} 
            switchToRegister={() => setIsLogin(false)} 
          />
        ) : (
          <RegisterForm 
            switchToLogin={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;