import React, { useState } from 'react'
import { auth, handleUserProfile } from '../../firebase/utils'
import Buttons from '../forms/Buttons'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import './styles.scss'

function SignUp() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState([])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if(pass !== confirm){
            const err = ['Passwords dont match']
            setErrors([...err])
            return
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email,pass)
            await handleUserProfile(user, {displayName})
        }catch(e){
            console.log(e)
            setErrors([e.message])
        }finally{
            /* setDisplayName('')
            setEmail('')
            setPass('')
            setConfirm('')
            setErrors([]) */
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
        <FormCustom headline='Registration'>
                {showErrors()}
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

export default SignUp
