import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/utils'
import './styles.scss'
import Logo from '../../assets/logo.png'

function Header({ currentUser }) {
    return (
        <div>
            <header className="header">
                <div className="wrapper">
                    <div className="logo">
                        <Link to='/'>
                            <img src={Logo} alt="your company logo"/>
                        </Link>
                    </div>

                    <div className='links'>
                        {currentUser && (
                            <ul>
                                <li>
                                    <span onClick={() => auth.signOut()}>
                                        LogOut
                                    </span>
                                </li>
                            </ul>
                        )}
                        {!currentUser && (
                            <ul>
                                <li>
                                    <Link to='/registration'>Sign In</Link>
                                </li>
                                <li>
                                    <Link to='/login'>Log In</Link>
                                </li>
                            </ul>    
                        )}
                        
                    </div>
                </div>
            </header>
        </div>
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header
