import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInUserAction, resetFormsAction } from '../../redux/index'
import Buttons from '../forms/Buttons'
import Errors from '../forms/Errors'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import './styles.scss'

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess,
    signInErrors: user.signInErrors
})

const SignIn = ({ history }) => {
    const dispatch = useDispatch()
    const { signInSuccess, signInErrors } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [pass,  setPass] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(signInSuccess){
            resetForm()
            dispatch(resetFormsAction())
            history.push('/')    
        }
    }, [signInSuccess, dispatch, history])
    
    useEffect(() => {
        if(Array.isArray(signInErrors) && signInErrors.length > 0){
            setErrors(signInErrors)
            resetForm() 
        }
    }, [signInErrors])

    const resetForm = () => {
        setEmail('')
        setPass('')
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(signInUserAction({ email, pass }))
    }
    
    return (
        <FormCustom headline='Login'>
                <Errors errors={errors}/>
                <div className='form-wrap'>
                    <form onSubmit={handleOnSubmit}>
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
                        <Buttons type='submit'>
                            Log In
                        </Buttons>
                        <div className='recovery'>
                            <Link to='/recovery'>
                                Forgot your Password?
                            </Link>
                        </div>
                        {/* <div className='social-singin'>
                            <div className='row'>
                                <Buttons onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Buttons>
                            </div>
                        </div> */}
                    </form>
                </div>
        </FormCustom>
    )
}

export default withRouter(SignIn)
