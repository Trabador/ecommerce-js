import React from 'react'
import './styles.scss'

function Directory() {
    return (
        <div className="directory">
            <div className="wrapper">
                <div className="item coffee">
                    <a href="/coffee">Buy Coffee</a>
                </div>
                <div className="item tea">
                    <a href="/tea">Buy Tea</a>
                </div>
            </div>
            
        </div>
    )
}

export default Directory
