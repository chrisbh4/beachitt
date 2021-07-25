import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import '../Naviagation/Navigation.css';
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
    <>
    <nav className="nav-container">
    <button>
           <NavLink
              exact to="/"
              className="navLink"
            >Home</NavLink>

        </button>
        <button>
        <NavLink
            to="/units"
            className="navLink"
          >Rental Units</NavLink>
          </button>
          <button>
        <NavLink
            to="/new"
            className="navLink"
          >New Rental Unit</NavLink>
          </button>
      <button onClick={openMenu}>
      <i class="fas fa-umbrella-beach"></i>
      </button>
{/* Profile Menu */}
      {showMenu && (
        <ul className="profile-dropdown">
          <li> {user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      </nav>
    </>

  );
}

export default ProfileButton;
