import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

function UserLayout(props) {
    return (
        <div>
            <Header />
            <NavBar />
            <div className='main'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout
