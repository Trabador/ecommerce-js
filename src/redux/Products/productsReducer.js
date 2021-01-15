import productTypes from './productsActionTypes'

const initialState =  {
    coffeeProducts: {},
    teaProducts: {},
    productDetails: {}
}

const productsReducer = (state = initialState, { type, payload } ) => {
    switch(type){
        case productTypes.FETCH_COFEE_PRODUCTS:
            return {
                ...state,
                coffeeProducts: payload
            }
        case productTypes.FETCH_TEA_PRODUCTS:
            return {
                ...state,
                teaProducts: payload
            }
        case productTypes.SEARCH_COFFE_PRODUCTS:
            return {
                ...state,
                coffeeProducts: payload
            }
        case productTypes.SEARCH_TEA_PRODUCTS:
            return {
                ...state,
                teaProducts: payload
            }
        case productTypes.FETCH_PRODUCT:
            return {
                ...state,
                productDetails: payload
            }
        case productTypes.RESET_PRODUCT:
            return {
                ...state,
                productDetails: payload
            }
        default: 
            return state
    }
}

export default productsReducer