import React from 'react'
import './styles.scss'

function Buttons({ children, ...otherProps}) {
    return (
        
            <button {...otherProps} className='btn'>
                {children}
            </button>
        
    )
}

export default Buttons
