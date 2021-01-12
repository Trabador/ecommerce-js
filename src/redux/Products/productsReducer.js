import productTypes from './productsActionTypes'

const initialState =  {
    coffeeProducts: {},
    teaProducts: {},
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
        default: 
            return state
    }
}

export default productsReducer