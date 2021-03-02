import React from 'react'
import { useSelector } from 'react-redux'
import './styles.scss'

function Dashboard() {
    const currentUser = useSelector(state => state.user.currentUser)
    return (
        <div>
            <h2>
                Welcome {currentUser.displayName}
            </h2>
        </div>
    )
}

export default Dashboard