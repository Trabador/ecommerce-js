import { useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../../redux'
import { useHistory } from 'react-router-dom'

const initialState = {
    name: '',
    address: '',
    city: '',
    zipcode: '',
    phone: ''
}

export const TYPES = {
    NAME: 'NAME',
    ADDRESS: 'ADDRESS',
    CITY: 'CITY',
    ZIPCODE: 'ZIPCODE',
    PHONE: 'PHONE',
    CLEAN_FORM: 'CLEAN_FORM'

}

const reducer = (state, { action, payload}) => {
    switch(action){
        case 'NAME':
            return { ...state, name: payload}
        case 'ADDRESS':
            return { ...state, address: payload}
        case 'CITY':
            return { ...state, city: payload}
        case 'ZIPCODE':
            return { ...state, zipcode: payload}
        case 'PHONE':
            return { ...state, phone: payload}
        case 'CLEAN':
            return initialState
        default: 
            return state
        
    }
}

const useData = () => {

    const [state, dispatchData] = useReducer(reducer, initialState)
    const [errors, setErrors] = useState([])

    const currentUser = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()

    const history = useHistory()

    const resetForm = () => {
        dispatchData({action: TYPES.CLEAN_FORM})
    }

    const isEmpty = (data) => {
        if(data === '') return true
        if(data === null) return true
        if(data === undefined) return true
        return false
    }

    const validateFormData = () => {
        if(isEmpty(state.name) || isEmpty(state.address) ||
            isEmpty(state.city) || isEmpty(state.zipcode) || isEmpty(state.phone)){
            setErrors(['* All fields are mandatory'])
            return false
        } 
        return true 
    }

    const handleOnPaymentSubmit = (e) =>{
        e.preventDefault()
        if(!validateFormData()) return
        dispatch(emptyCart({ userId: currentUser.id }))
        resetForm()
        history.push('/finish')
    }

    return [state, dispatchData, handleOnPaymentSubmit, errors]

}

export default useData