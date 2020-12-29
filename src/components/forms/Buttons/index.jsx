import React from 'react'
import './styles.scss'

function Buttons({ children, ...otherProps}) {
    return (
        <div>
            <button {...otherProps} className='btn'>
                {children}
            </button>
        </div>
    )
}

export default Buttons
