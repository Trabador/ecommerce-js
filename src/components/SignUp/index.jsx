import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserAction, resetFormsAction } from '../../redux/index'
import Buttons from '../forms/Buttons'
import Errors from '../forms/Errors'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import './styles.scss'

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpErrors: user.signUpErrors
})

const SignUp = ({ history }) => {
    const dispatch = useDispatch()
    const { signUpSuccess, signUpErrors } = useSelector(mapState)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(signUpSuccess){
            resetForm()
            dispatch(resetFormsAction())
            history.push('/')
        }
    }, [signUpSuccess, dispatch, history])

    useEffect(() => {
        if(Array.isArray(signUpErrors) && signUpErrors.length > 0){
            setErrors(signUpErrors)
            resetForm() 
        }
    }, [signUpErrors])

    const resetForm  = () => {
        setDisplayName('')
        setEmail('')
        setPass('')
        setConfirm('')
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(signUpUserAction({ displayName, email, pass, confirm }))
    }

    return (
        <FormCustom headline='Registration'>
                <Errors errors={errors}/>
                <form onSubmit={handleOnSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        value={displayName}
                        placeholder='Full Name'
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormInput 
                        type='password'
                        name='password'
                        value={pass}
                        placeholder='Password'
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <FormInput 
                        type='password'
                        name='confirm'
                        value={confirm}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                    <Buttons type='submit'>
                        Register
                    </Buttons>
                </form>
        </FormCustom>
    )
}

export default withRouter(SignUp)
