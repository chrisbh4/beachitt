import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import RentalUnitsPage from "./components/RentalUnitsPage/AllUnits";
import Navigation from "./components/Naviagation";
import GetSingleUnitPage from "./components/RentalUnitsPage/SingleUnitPage";
import NewUnitForm from "./components/RentalUnitsPage/NewUnit/NewUnitForm";
import EditReviewForm from "./components/Reviews/EditReview";
import SplashPage from "./components/SplashPage";
import NotFound from "./components/NotFound";
import AccountSettings from "./components/AccountSettings";

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
          <Route exact path='/'>
            <SplashPage />
          </Route>

          <Route exact path="/units">
            <RentalUnitsPage />
          </Route>

          <Route exact path="/units/:id">
            <GetSingleUnitPage />
          </Route>

          <Route path="/new">
            <NewUnitForm />
          </Route>

          <Route path='/reviews/:id/edit'>
            <EditReviewForm />
          </Route>

          <Route exact path="/account/settings">
            <AccountSettings />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
