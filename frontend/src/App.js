import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import * as sessionActions from "./store/session";
import RentalUnitsPage from "./components/RentalUnitsPage/index";
import Navigation from "./components/Naviagation";
import NewUnitForm from "./components/RentalUnitsPage/NewUnitForm";
import EditUnitForm from "./components/EditRentalUnit/Edit";
// import GetRentalUnitPage from "./components/UnitPage";
import HomePage from "./components/Home/home";
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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/units">
            <RentalUnitsPage />
          </Route>
          {/* if uncommented EditUnitForm is not displayed */}
          {/* <Route path = "/units/:id">
            <GetRentalUnitPage />
          </Route> */}
          <Route  path="/new">
            < NewUnitForm />
          </Route>
          <Route  path ="/units/edit/:id">
            <EditUnitForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
