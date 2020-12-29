import React from 'react'
import { signInWithGoogle } from '../../firebase/utils'
import Buttons from '../forms/Buttons'

function SignIn() {
    const handleOnSubmit = (e) => {
        e.preventDefault()
    }   

    return (
        <div className='signin'>
            <div className='wrapper'>
                <h2>LogIn</h2>

                <div className='form-wrap'>
                <form onSubmit={handleOnSubmit}>
                        <div className='social-singin'>
                            <div className='row'>
                                <Buttons onClick={signInWithGoogle}>
                                    Sign in with Google
                                </Buttons>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            
        </div>
    )
}

export default SignIn
