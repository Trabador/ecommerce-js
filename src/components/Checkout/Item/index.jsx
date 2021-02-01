import React from 'react'

function Item({ item, handleRemoveItem, handleAddItem, handleDecrementItem }) {
    const {
        productThumbnail,
        productName,
        productPrice,
        quantity,
    } = item

    const handleOnRemove = () => {
        handleRemoveItem(item)
    }

    const handleOnAdd = () => {
        handleAddItem(item)
    }

    const handleOnDecrement = () => {
        handleDecrementItem(item)
    }

    return (
        <table className='cartItem' border='0' cellSpacing='0' cellPadding='10'>
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName}/>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className='btn-qty' onClick={handleOnDecrement}>
                            {'< '}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span className='btn-qty' onClick={handleOnAdd}>
                            {' >'}
                        </span>
                    </td>
                    <td>
                        ${productPrice}
                    </td>
                    <td align='center'>
                        <span className='remove' onClick={handleOnRemove}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Item
