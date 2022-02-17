import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import * as sessionActions from "./store/session";
import RentalUnitsPage from "./components/RentalUnitsPage/AllUnits";
import Navigation from "./components/Naviagation";
// import HomePage from "./components/Home/home";
import GetSingleUnitPage from "./components/RentalUnitsPage/SingleUnitPage";
import NewUnitForm from "./components/RentalUnitsPage/NewUnit/NewUnitForm";
import EditReviewForm from "./components/Reviews/EditReview";

import SplashPage from "./components/SplashPage";


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
          {/* <Route exact path="/">
          <HomePage />
          </Route> */}

          <Route exact path='/'>
            <SplashPage />
          </Route>

          <Route exact path="/units">
            <RentalUnitsPage />
          </Route>

{/* if uncommented EditUnitForm is not displayed */}
          <Route exact path="/units/:id">
            <GetSingleUnitPage />
          </Route>

          <Route  path="/new">
            < NewUnitForm />
          </Route>



          <Route path='/reviews/:id/edit'>
            <EditReviewForm />
          </Route>



        {/* Create 404 component */}
        <Route>
          404 page not found
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
