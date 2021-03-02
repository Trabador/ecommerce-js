import { createSelector } from 'reselect'

const selectCart = state => state.cart

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.items
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    items => items? items.reduce((count, item) => count + item.quantity, 0) : 0
)

export const selectCartItemsTotalAmount = createSelector(
    [selectCartItems],
    items => items.reduce((totalAmount, item) => totalAmount + (item.productPrice * item.quantity), 0)
)