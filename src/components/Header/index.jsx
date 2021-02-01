import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/utils'
import { selectCartItemsCount } from '../../redux/Cart/cartSelectors'
import './styles.scss'
import Logo from '../../assets/logo.png'

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalItemsInCart: selectCartItemsCount(state)
})

function Header() {
    const { currentUser, totalItemsInCart } = useSelector(mapState)

    return (
        <header className="header">
                <div className="wrapper">
                    <div className="logo">
                        <Link to='/'>
                            <img src={Logo} alt="your company logo"/>
                        </Link>
                    </div>

                    <div className='links'>
                        <ul>

                            {currentUser && ([
                                <li key='1'>
                                    <Link to='/cart'>
                                        My Cart ({totalItemsInCart})
                                    </Link>
                                </li>,
                                <li key='2'>
                                    <Link to='/dashboard'>My Account</Link>
                                </li>,
                                <li key='3'>
                                    <span onClick={() => auth.signOut()}>
                                        LogOut
                                    </span>
                                </li>]
                            )}

                            {!currentUser && ([
                                <li key='1'>
                                    <Link to='/registration'>Register</Link>
                                </li>,
                                <li key='2'>
                                    <Link to='/login'>Log In</Link>
                                </li>]
                            )}
                        </ul>
                    </div>
                </div>
        </header>
    )
}

export default Header
