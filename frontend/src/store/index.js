import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import rentalUnitReducer from './rentalUnits';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';
import mapsReducer from './maps';
import favoritesReducer from './favorites';

const rootReducer = combineReducers({
    session: sessionReducer,
    rentalUnit: rentalUnitReducer,
    reviews: reviewsReducer,
    bookings: bookingsReducer,
    mapApi: mapsReducer,
    favorites: favoritesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;
