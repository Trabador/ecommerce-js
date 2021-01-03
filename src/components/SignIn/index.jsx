import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {  auth } from '../../firebase/utils'
import Buttons from '../forms/Buttons'
import Errors from '../forms/Errors'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import './styles.scss'

const SignIn = ({ history }) => {
    const [email, setEmail] = useState('')
    const [pass,  setPass] = useState('')
    const [errors, setErrors] = useState([])

    const resetForm = () => {
        setEmail('')
        setPass('')
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try{
            await auth.signInWithEmailAndPassword(email, pass)
            resetForm()
            history.push('/')
        }catch(e){
            console.log(e)
            setErrors([e.message])
            resetForm()
        }
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
