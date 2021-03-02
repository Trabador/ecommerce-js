import userTypes from './userActionTypes'
import cartTypes from '../Cart/cartActionTypes'
import { auth, firestore, handleUserProfile } from '../../firebase/utils'

export const setCurrentUserAction = (user) => dispatch => {
    if(user){
        const reference = firestore.collection('users').doc(user.id)
        reference.get()
            .then(snapshot => {
                const data = snapshot.data().cart ? snapshot.data().cart: null
                dispatch({
                    type: userTypes.SET_CURRENT_USER,
                    payload: user
                })
                if(data){
                    dispatch({
                        type: cartTypes.GET_CART_ITEMS,
                        payload: data
                    })
                }
            })
            .catch(err => {})
    }else {
        dispatch({
            type: userTypes.SET_CURRENT_USER,
            payload: user
        })
    }
}

const signInSuccessAction = (isSuccess) => {
    return {
        type: userTypes.SIGN_IN_SUCCESS,
        payload: isSuccess
    }
}

const signInErrorAction = (errors) => {
    return {
        type: userTypes.SIGN_IN_ERROR,
        payload: errors
    }
}

export const signInUserAction = ({ email, pass }) => dispatch => {
    auth.signInWithEmailAndPassword(email, pass)
        .then(_ => {
            dispatch(signInSuccessAction(true))
        })
        .catch(err => {
            console.log(err)
            const errors = [err.message]
            dispatch(signInErrorAction(errors))
        })
}

const signUpSuccessAction = (isSuccess) => {
    return {
        type: userTypes.SIGN_UP_SUCCESS,
        payload: isSuccess
    }
}

const signUpErrorAction = (errors) => {
    return {
        type: userTypes.SIGN_UP_ERROR,
        payload: errors
    }
}

export const signUpUserAction = ({ displayName, email, pass, confirm }) => dispatch => {
    if(pass !== confirm){
        const error = ['Passwords don\'t match']
        dispatch(signUpErrorAction(error))
        return
    }

    auth.createUserWithEmailAndPassword(email,pass)
        .then( async (userCredential) => {
            const user = userCredential.user
            await user.updateProfile({ displayName })
            await handleUserProfile(user, { displayName })
            dispatch(signUpSuccessAction(true))
        })
        .catch(err => {
            console.log(err.message)
            const errors = [err.message]
            dispatch(signUpErrorAction(errors))        
        })  
}

const resetPasswordSuccessAction = (isSuccess) => {
    return {
        type: userTypes.RESET_PASSWORD_SUCCESS,
        payload: isSuccess
    }
}

const resetPasswordErrorAction = (errors) => {
    return {
        type: userTypes.RESET_PASSWORD_ERROR,
        payload: errors
    }
}

export const resetPasswordAction = ({ email }) => dispatch => { 
    const configReset = {
        url: 'http://localhost:3000/login'
    }
    auth.sendPasswordResetEmail(email, configReset)
        .then(() => {
            dispatch(resetPasswordSuccessAction(true))
        })
        .catch((err) => {
            const errors = [err.message]
            dispatch(resetPasswordErrorAction(errors))
        })
}

export const resetFormsAction = () => {
    return {
        type: userTypes.RESET_FORMS,
        payload: null
    }
}



