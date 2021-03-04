import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCartItems, selectCartItemsTotalAmount } from '../../redux/Cart/cartSelectors'
import { createStructuredSelector } from 'reselect'
import { removeItemFromCartAction, addItemToCartAction, decrementItemFromCartAction, emptyCart } from '../../redux'
import Buttons from '../forms/Buttons'
import Item from './Item'
import './styles.scss'

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    totalAmount: selectCartItemsTotalAmount
})

function Checkout() {
    const { cartItems, totalAmount } = useSelector(mapState)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleRemoveItem = (itemToRemove) => {
        dispatch(removeItemFromCartAction({ userId: currentUser.id, itemToRemove, items: cartItems}))
    }

    const handleAddItem = (toAdd) => {
        dispatch(addItemToCartAction({ userId: currentUser.id, toAdd }))
    }

    const handleDecrementItem = (itemToDecrement) => {
        dispatch(decrementItemFromCartAction({ userId: currentUser.id, itemToDecrement, items: cartItems }))
    }

    const handleCheckout = () => {
        dispatch(emptyCart({ userId: currentUser.id }))
        history.push('/purchase')
    }

    return (
        <div className='checkout'>
            <h2>
                Checkout
            </h2>
            <div className='cart'>
                {cartItems.length > 0 ? (
                    <table border='0' cellPadding='0' cellSpacing='0'>
                    <tbody>
                        <tr>
                            <td>
                                <table className='checkoutHeader' border='0' cellPadding='10' cellSpacing='0'>
                                    <tbody>
                                        <tr>
                                            <th>
                                                Product
                                            </th>
                                            <th>
                                                Description
                                            </th>
                                            <th>
                                                Quantity
                                            </th>
                                            <th>
                                                Price
                                            </th>
                                            <th>
                                                Remove
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <table border='0' cellPadding='0' cellSpacing='0'>
                                    <tbody>
                                        {
                                            cartItems.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <Item 
                                                                item={item} 
                                                                handleRemoveItem={handleRemoveItem}
                                                                handleAddItem={handleAddItem}
                                                                handleDecrementItem={handleDecrementItem}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <table align='right' border='0' cellSpacing='0' cellPadding='10'>
                                    <tbody>
                                        <tr align='right'>
                                            <td>
                                                <h3>
                                                    Total: ${totalAmount}
                                                </h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table border='0' cellSpacing='0' cellPadding='10'>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Buttons onClick={() => history.goBack()}>
                                                                    Continue Shopping
                                                                </Buttons>
                                                            </td>
                                                            <td>
                                                                <Buttons onClick={handleCheckout}>
                                                                    Checkout
                                                                </Buttons>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                ) : (
                    <p>You have no items in your cart.</p>
                )
                }
            </div>
        </div>
    )
}

export default Checkout
