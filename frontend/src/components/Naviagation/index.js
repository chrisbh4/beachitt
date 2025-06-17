import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../Modals/LoginModal';
import SignUpFormModal from '../SignupFormPage/SignUpModal';

import * as sessionActions from "../../store/session"
import * as rentalUnitActions from "../../store/rentalUnits"


// * Add modal to the nav instead of having a NavLink button

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState(null);

  const demoLogin = async() => {
    setIsDemoLoading(true);
    setDemoError(null);

    try {
      const result = await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }));

      if (result.errors || result.status === 401) {
        setDemoError('Demo login failed. Please try logging in manually.');
        return;
      }

      history.push('/units');
    } catch (error) {
      setDemoError('Demo login failed. Please try logging in manually.');
    } finally {
      setIsDemoLoading(false);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    // Navigate to units page with search query (even if empty)
    history.push(`/units?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <img className="h-8 w-auto" src="/logos/batteriesinc-logo.svg" alt="BeachItt" />
              </NavLink>
            </div>

            {/* Center Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="w-full relative">
                <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex-1 px-6 py-2">
                    <input
                      type="text"
                      placeholder="Search by state (e.g., CA, California, FL, Florida)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full text-sm text-gray-700 placeholder-gray-500 border-none outline-none bg-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full mr-2 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              <NavLink
                to="/new"
                className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Become a host
              </NavLink>
              <NavLink
                to="/units"
                className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Explore
              </NavLink>
              <ProfileButton user={sessionUser} />
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    sessionLinks = (
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <img className="h-8 w-auto" src="/logos/batteriesinc-logo.svg" alt="BeachItt" />
              </NavLink>
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-2">
              <NavLink
                to="/units"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Explore
              </NavLink>

              <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow duration-200">
                <button
                  onClick={demoLogin}
                  disabled={isDemoLoading}
                  className={`text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200 ${
                    isDemoLoading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {isDemoLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Demo
                    </div>
                  ) : (
                    'Demo'
                  )}
                </button>
                <LoginFormModal />
                <SignUpFormModal />
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Demo Error Notification */}
            {demoError && (
              <div className="fixed top-4 right-4 z-50 px-6 py-4 bg-red-500 text-white rounded-lg shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{demoError}</span>
                  <button
                    onClick={() => setDemoError(null)}
                    className="ml-2 hover:text-gray-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {isLoaded && sessionLinks}
    </>
  );
}

export default Navigation;
