import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Buttons from '../forms/Buttons'
import FormCustom from '../forms/FormCustom'
import FormInput from '../forms/FormInput'
import { auth } from '../../firebase/utils'
import Errors from '../forms/Errors'

function ResetPass(props) {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try{
            const configReset = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, configReset)
                .then(() => {
                    props.history.push('/login')
                })
                .catch((err) => {
                    setErrors([err.message])
                    setEmail('')
                })
        }catch(err){
            console.log(err)
        }
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
