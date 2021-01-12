import { combineReducers } from 'redux'
import userReducer from './User/userReducer'
import productsReducer from './Products/productsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer
})

export default rootReducer
