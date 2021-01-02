import userTypes from './userActionTypes'

const initialState = {
    currentUser: null
}

const userReducer = (state=initialState, { type, payload }) => {
    switch(type){
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}

export default userReducer