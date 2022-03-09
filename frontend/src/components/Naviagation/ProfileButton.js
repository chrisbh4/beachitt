import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import '../Naviagation/Navigation.css';
import NewUnitModal from "../Modals/Units/NewUnitModal";
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

        <div id='loggedIn-nav-title' >
          <h1>BeachItt</h1>
        </div>

  <div class='w-1/2 flex justify-evenly relative p-4  '>
        <button
            id='navButton'
        >
          <NavLink
            exact to="/"
            className="navLink"
          >Home</NavLink>

        </button>



        <button
            id='navButton'
        >
          <NavLink
            to="/units"
            className="navLink"
          >All Units</NavLink>
        </button>


        <NewUnitModal />


        <button
         id='navButton'
        onClick={openMenu}
        >
        Show Menu
        </button>
        </div>

      {/* Profile Menu */}
      </nav>
      {showMenu && (
        <div  id="menu-background-container" class='flex justify-center'>
        <div id='profile-bg' class='absolute bg-yellow-100 px-10 py-3 '>
        <ul className="profile-dropdown"  >
          <li class='py-1'> {user.username}</li>
          <li class='py-1'>{user.email}</li>
          <li class='pt-2'>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
        </div>
        </div>
      )}
    </>

  );
}

export default ProfileButton;
