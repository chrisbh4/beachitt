import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">🏖️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oops!
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            We can't seem to find the page you're looking for.
          </h2>
          <p className="text-gray-500 mb-8">
            Error code: 404
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => history.push('/')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go back home
          </button>
          
          <button
            onClick={() => history.push('/units')}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Browse stays
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 