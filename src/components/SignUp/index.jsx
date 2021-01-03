import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { auth, handleUserProfile } from '../../firebase/utils'
import Buttons from '../forms/Buttons'
import Errors from '../forms/Errors'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import './styles.scss'

const SignUp = ({ history }) => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState([])

    const resetForm  = () => {
        setDisplayName('')
        setEmail('')
        setPass('')
        setConfirm('')
        setErrors([])
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if(pass !== confirm){
            const err = ['Passwords dont match']
            setErrors([...err])
            resetForm()
            return
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email,pass)
            await handleUserProfile(user, {displayName})
            resetForm()
            history.push('/')
        }catch(e){
            console.log(e)
            setErrors([e.message])
            resetForm()
        }
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
