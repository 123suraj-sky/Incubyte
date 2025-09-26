/**
 * LoadingSpinner displays a simple animated spinner.
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size of the spinner.
 */
import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-white border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;