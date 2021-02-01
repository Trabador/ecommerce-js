import cartTypes from './cartActionTypes'
import { firestore } from '../../firebase/utils'

const isInCartAlready = (cart, toAdd) => {
    return cart.find(item => item.id === toAdd.id)
}

export const addItemToCartAction = ({ userId, toAdd }) => dispatch => {
    const increment = 1
    const reference = firestore.collection('users').doc(userId)
    reference.get()
        .then(snapshot => {
            let itemsCart = snapshot.data().cart
            if(isInCartAlready(itemsCart, toAdd)){
                itemsCart = itemsCart.map(item => {
                    if(item.id === toAdd.id){
                        return {
                            ...item,
                            quantity: item.quantity+increment
                        }
                    } 
                    return item
                })
            }
            else{
                itemsCart = [
                    ...itemsCart,
                    {
                        ...toAdd,
                        quantity: increment
                    }
                ]
            }
            reference.set({
                cart: itemsCart
            }, { merge: true })
                .then(() => {
                    dispatch({
                        type: cartTypes.ADD_ITEM_TO_CART,
                        payload: itemsCart
                    })
                })
        })
        .catch()
}

export const removeItemFromCartAction = ({ userId, itemToRemove, items}) => dispatch  => {
    const reference = firestore.collection('users').doc(userId) 
    const newItemList  = items.filter(item => item.id !== itemToRemove.id)
    reference.set({
        cart: newItemList
    }, { merge: true })
        .then(() => {
            dispatch({
                type: cartTypes.REMOVE_ITEM_FROM_CART,
                payload: newItemList
            })
        })
}

export const decrementItemFromCartAction = ({ userId, itemToDecrement , items }) => dispatch => {
    const reference = firestore.collection('users').doc(userId)
    let newItemList
    if(itemToDecrement.quantity > 1){
        newItemList = items.map(item => {
            if(item.id === itemToDecrement.id){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item   
        })
    }else {
        newItemList = items.filter(item => item.id !== itemToDecrement.id)
    }
    reference.set({
        cart: newItemList
    }, { merge: true })
        .then(() => {
            dispatch({
                type: cartTypes.DECREMENT_ITEM_FROM_CART,
                payload: newItemList
            })
        })
}