import cartTypes from './cartActionTypes'

const initialState = {
    items: []
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case cartTypes.GET_CART_ITEMS:
            return {
                ...state,
                items: payload
            }
        case cartTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                items: payload
            }
        case cartTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                items: payload
            }
        case cartTypes.DECREMENT_ITEM_FROM_CART:
            return {
                ...state,
                items: payload
            }
        case cartTypes.EMPTY_ITEMS_FROM_CART:
            return {
                ...state,
                items: []
            }
        default: 
            return state
    }
}

export default cartReducer