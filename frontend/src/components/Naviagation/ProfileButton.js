import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={openMenu}
        className="flex items-center space-x-3 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow duration-200 bg-white"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.username}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <NavLink
              to="/units"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowMenu(false)}
            >
              Browse stays
            </NavLink>
            <NavLink
              to="/new"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowMenu(false)}
            >
              Host your home
            </NavLink>
          </div>
          
          <div className="border-t border-gray-100 py-1">
            <NavLink
              to="/account/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowMenu(false)}
            >
              Account settings
            </NavLink>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Help Center
            </button>
          </div>
          
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
