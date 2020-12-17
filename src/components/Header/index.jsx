import React from 'react'
import './styles.scss'
import Logo from '../../assets/logo.png'

function Header() {
    return (
        <div>
            <header className="header">
                <div className="wrapper">
                    <div className="logo">
                        <img src={Logo} alt="your company logo"/>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
