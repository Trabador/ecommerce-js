import userTypes from './userActionTypes'

const initialState = {
    currentUser: null,
    signInSuccess: false,
    signInErrors: [],
    signUpSuccess: false,
    signUpErrors: [],
    resetPasswordSuccess: false,
    resetPasswordErrors: []
}

const userReducer = (state=initialState, { type, payload }) => {
    switch(type){
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                signInSuccess: payload
            }
        case userTypes.SIGN_IN_ERROR:
            return {
                ...state,
                signInErrors: payload
            }
        case userTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpSuccess: payload
            }
        case userTypes.SIGN_UP_ERROR:
            return {
                ...state,
                signUpErrors: payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: payload
            }
        case userTypes.RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordErrors: payload
            }
        case userTypes.RESET_FORMS:
            return {
                ...state,
                signInSuccess: false,
                signInErrors: [],
                signUpSuccess: false,
                signUpErrors: [],
                resetPasswordSuccess: false,
                resetPasswordErrors: []
            }
        default:
            return state
    }
}

export default userReducer