import React from 'react'
import Buttons from '../forms/Buttons'
import './styles.scss'

function LoadMore(props) {
    return (
        <div className='load-more'>
            <Buttons {...props}>
                Load More
            </Buttons>
        </div>
    )
}

export default LoadMore
