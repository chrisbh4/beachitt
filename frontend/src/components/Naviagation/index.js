import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../Modals/LoginModal';
import SignUpFormModal from '../SignupFormPage/SignUpModal';

import * as sessionActions from "../../store/session"


// * Add modal to the nav instead of having a NavLink button

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />

    );
  } else {
    sessionLinks = (
      <>
        <div className="notSignedIn-container">

          <nav className="nav-notSignedIn">

            <button >
              <NavLink
                exact to="/"
                className="navLink"
              >Home</NavLink>
            </button>

            {/* <button>
              <NavLink
                to="/login"
                className="navLink"
              >Log In</NavLink>
            </button> */}
            <LoginFormModal/>

            <button
              onClick={demoLogin}
              hidden={sessionUser}>
              Demo User
            </button>


            {/* <button>
              <NavLink
                to="/signup"
                className="navLink"

              >Sign Up</NavLink>
            </button> */}

            <SignUpFormModal />


            {/* <button>
              <NavLink
                to="/units"
                className="navLink"
              >Rental units</NavLink>
            </button> */}


          </nav>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoaded && sessionLinks}
    </>
  );
}

export default Navigation;
