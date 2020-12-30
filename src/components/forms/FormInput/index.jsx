import React from 'react'
import './styles.scss'

function FormInput({ handleOnChange, label, ...otherProps }) {
    return (
        <div className='form-row'>
            {label && (
                <label>
                    {label}
                </label>
            )}
            <input className='formInput' onChange={handleOnChange} {...otherProps} />
        </div>
    )
}

export default FormInput
