import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import * as sessionActions from "./store/session";
import RentalUnitsPage from "./components/RentalUnitsPage/AllUnits";
import Navigation from "./components/Naviagation";
import HomePage from "./components/Home/home";
import GetRentalUnitPage from "./components/RentalUnitsPage/SingleUnitPage";
import NewUnitForm from "./components/RentalUnitsPage/NewUnit/NewUnitForm";
import EditUnitForm from "./components/RentalUnitsPage/EditUnit/Edit";
import EditReviewForm from "./components/Reviews/EditReview";
import EditBookingPage from "./components/Booking-Cal/EditBooking";
import MapContainer from "./components/Maps";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
          <HomePage />
          </Route>

          <Route exact path="/units">
            <RentalUnitsPage />
          </Route>

{/* if uncommented EditUnitForm is not displayed */}
          <Route exact path="/units/:id">
            <GetRentalUnitPage />
          </Route>

          <Route  path="/new">
            < NewUnitForm />
          </Route>

          {/* <Route  path="/units/edit/:id">
            <EditUnitForm />
          </Route> */}

{/* Review Routes */}
          {/* <Route path='/:id/reviews/new'>
            <NewReviewForm />
          </Route> */}

          <Route path='/reviews/:id/edit'>
            <EditReviewForm />
          </Route>

        <Route path='/map'>
          <MapContainer />
        </Route>

        <Route path='/bookings/:id/edit'>
         <EditBookingPage />
        </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
