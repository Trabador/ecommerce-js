import React from 'react'
import './styles.scss'

function FormCustom({ headline, children}) {
    return (
        <div className='form-wrapper'>
            <div className='wrapper'>
                {headline && <h2>{headline}</h2>}
                <div className='children'>
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default FormCustom
