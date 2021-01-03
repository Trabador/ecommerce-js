import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const mapState = (state) => ({
    currentUser: state.user.currentUser
})

const useAuth = ({ history }) => {
    const { currentUser } = useSelector(mapState)
    console.log(currentUser)

    useEffect(() => {
        if(!currentUser){
            console.log('entro al if')
            history.push('/login')
        }
    }, [currentUser, history])

    return currentUser
}

export default useAuth

