import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  auth } from '../../firebase/utils'
import Buttons from '../forms/Buttons'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import './styles.scss'

function SignIn() {
    const [email, setEmail] = useState('')
    const [pass,  setPass] = useState('')
    const [errors, setErrors] = useState([])
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try{
            await auth.signInWithEmailAndPassword(email, pass)
        }catch(e){
            console.log(e)
            setErrors([e.message])
        }finally{
            setEmail('')
            setPass('')
        }
    }
    
    const showErrors = () => {
        if(errors <= 0) return
        return (
            <ul>
                {errors.map( (error, index) => (
                    <li key={index}>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <FormCustom headline='Login'>
                {showErrors()}
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

export default SignIn
