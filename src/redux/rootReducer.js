import { combineReducers } from 'redux'
import userReducer from './User/userReducer'
import productsReducer from './Products/productsReducer'
import cartReducer from './Cart/cartReducer'

const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    cart: cartReducer
})

export default rootReducer
