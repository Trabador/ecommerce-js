import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import Logo from '../../assets/logo.png'

function Header() {
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
                        <ul>
                            <li>
                                <Link to='/registration'>Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
