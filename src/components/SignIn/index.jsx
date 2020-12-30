import React, { useState } from 'react'
import {  auth } from '../../firebase/utils'
import Buttons from '../forms/Buttons'
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

    return (
        <div className='signin'>
            <div className='wrapper'>
                <h2>LogIn</h2>
                {
                    errors.length > 0 && (
                        <ul>
                            {errors.map((error, index) => {
                                return (
                                    <li key={index}>{error}</li>
                                )
                            })}
                        </ul>
                    )
                }
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
                        {/* <div className='social-singin'>
                            <div className='row'>
                                <Buttons onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Buttons>
                            </div>
                        </div> */}
                    </form>
                </div>
            </div>

            
        </div>
    )
}

export default SignIn
