import React, { useState, useEffect } from 'react'
import { resetPasswordAction } from '../../redux/index'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Buttons from '../forms/Buttons'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import Errors from '../forms/Errors'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordErrors: user.resetPasswordErrors
})

const ResetPass = ({ history }) => {
    const dispatch = useDispatch()
    const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(resetPasswordSuccess){
           history.push('/login') 
        }
    }, [resetPasswordSuccess, history])

    useEffect(() => {
        if(Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0){
            setErrors(resetPasswordErrors)
        }
    }, [resetPasswordErrors])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPasswordAction({ email }))
    }

    return (
        <FormCustom headline='Reset Password'>
                <Errors errors={errors}/>
                <form onSubmit={handleOnSubmit}>
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Buttons type='submit'>
                        Reset Password
                    </Buttons>
                </form>
            
        </FormCustom>
    )
}

export default withRouter(ResetPass)
