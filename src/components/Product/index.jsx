import React from 'react'
import { useSelector } from 'react-redux'
import Buttons from '../forms/Buttons'
import './styles.scss'


function Product({ product }) {
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <div className='card'>
            <img  className='thumbnail' src={product.productThumbnail} alt={product.productName}/>
            <div className='container'>
                <span><b>{product.productName}</b></span>
                <p>${product.productPrice}</p>
            </div>
            {currentUser && 
                <Buttons>
                    Add to cart
                </Buttons>
            }
        </div>
    )
}

export default Product
