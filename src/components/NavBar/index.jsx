import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

function NavBar() {
    
    
    return (
        
            <div>
                <nav className='navigation'>
                   <Link to='/'>HOME</Link>
                   <Link to='/coffee'>COFFEE</Link>
                   <Link to='/tea'>TEA</Link>
                </nav>
            </div> 
        
    )
}

export default NavBar
