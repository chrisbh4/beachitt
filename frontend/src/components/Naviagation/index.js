import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../Modals/LoginModal';
import SignUpFormModal from '../SignupFormPage/SignUpModal';

import * as sessionActions from "../../store/session"


// * Add modal to the nav instead of having a NavLink button

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const demoLogin = async() => {
    await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    history.push('/units');
    return "Demo User logged in."
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

          <div id='logged-out-nav-title' >
          <h1>BeachItt</h1>
        </div>

<div class='w-1/2 flex justify-evenly relative left-12 bottom-1 p-3 '>
            <button >
              <NavLink
                exact to="/"
                className="navLink"
              >Home</NavLink>
            </button>


            <LoginFormModal />


            <button
              onClick={demoLogin}
              hidden={sessionUser}>
              Demo User
            </button>


            <button>
              <NavLink
                to="/units"
                className="navLink"
              >All Units</NavLink>
            </button>


            <SignUpFormModal />
</div>

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
