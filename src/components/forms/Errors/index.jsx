import React from 'react'
import './styles.scss'

function Errors({ errors }) {
    if(errors.length <= 0) return null
    return (
        <ul>
            {errors.map((error, index) =>(
                <li key={index}>
                    {error}
                </li>
            ))}
        </ul>
    )
}

export default Errors
