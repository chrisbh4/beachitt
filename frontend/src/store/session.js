import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// Log-In functionality
// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   const data = await response.json();

//   if(data.errors){
//     return data
//   }
//   dispatch(setUser(data.user));
//   return response;
// };


// Restores the Users functionality
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  // Sign-Up functionality
  export const signup = (user) => async (dispatch) => {
    const {username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();

    if(response.ok) dispatch(setUser(data.user));
    return data;
  };

// Logout functionality
  // export const logout = () => async (dispatch) => {
  //   const response = await csrfFetch('/api/session', {
  //     method: 'DELETE',
  //   });
  //   dispatch(removeUser());
  //   return response;
  // };

  let logoutTimer;

const startLogoutTimer = (expirationTime) => (dispatch) => {
  logoutTimer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

const clearLogoutTimer = () => {
  clearTimeout(logoutTimer);
};

export const login = ({ credential, password }) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(setUser(data.user));
    const expirationTime = 10 * 60 * 1000;
    dispatch(startLogoutTimer(expirationTime));
    return data;
  } else {
    return data;
  }
};

export const logout = () => async (dispatch) => {
  clearLogoutTimer();
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

// Update user profile
export const updateUser = (userData) => async (dispatch) => {
  const response = await csrfFetch("/api/users/profile", {
    method: "PUT",
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (response.ok) {
    dispatch(setUser(data.user));
    return data;
  } else {
    return data;
  }
};

// Update password
export const updatePassword = (passwordData) => async (dispatch) => {
  const response = await csrfFetch("/api/users/password", {
    method: "PUT",
    body: JSON.stringify(passwordData),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};


  export default sessionReducer;
