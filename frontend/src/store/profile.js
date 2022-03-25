import { csrfFetch } from "./csrf";


const LOAD_PROFILE = 'profile/LOAD';


const loadUserProfile = (user) => {
    return {
        type: LOAD_PROFILE,
        payload: user,
    }
}



export const fetchUserProfile = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`)
    const data = await res.json()
    await dispatch(loadUserProfile(data))

    return data
}


const initialState = {};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILE: {
            return { ...action.payload }
        }
        default:
            return state;
    }
}


export default userProfileReducer;
