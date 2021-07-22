import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import RentalUnitsPage from "./components/RentalUnitsPage/index";
import Navigation from "./components/Naviagation";
import NewUnitForm from "./components/RentalUnitsPage/NewUnitForm";

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route  path="/units">
            <RentalUnitsPage />
          </Route>
          <Route exact path="/new">
            < NewUnitForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
