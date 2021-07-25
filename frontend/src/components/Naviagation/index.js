import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import '../Naviagation/Navigation.css';

function Navigation({ isLoaded }){
  
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />

    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/units">Rental units</NavLink>

      </>
    );
  }

  return (
    <>
        {isLoaded && sessionLinks}

          <div className="top-rentals">
            <h2>Most Rented Rentals</h2>
          </div>
          <div className="top-rated">
            <h2>Highest Rated Rental </h2>
          </div>
          <div className="cheapest">
            <h2>Most Budget Friendly</h2>
          </div>
    </>
  );
}

export default Navigation;
