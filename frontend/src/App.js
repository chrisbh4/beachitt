import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import * as sessionActions from "./store/session";
import RentalUnitsPage from "./components/RentalUnitsPage/index";
import Navigation from "./components/Naviagation";
import NewUnitForm from "./components/RentalUnitsPage/NewUnitForm";
import EditUnitForm from "./components/EditRentalUnit/Edit";
import GetRentalUnitPage from "./components/UnitPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
}


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
          <Route exact path="/units">
            <RentalUnitsPage />
          </Route>
          <Route path = "/units/:id">
            <GetRentalUnitPage />
          </Route>
          <Route  path="/new">
            < NewUnitForm />
          </Route>
          <Route  path = "/units/edit/:id">
            <EditUnitForm />
          </Route>
        </Switch>
      )}
      <button
      onClick={demoLogin}
      hidden={sessionUser}
      >
        Demo User
      </button>
    </>
  );
}

export default App;
