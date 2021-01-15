import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Buttons from '../forms/Buttons'
import './styles.scss'


function Product({ product , type }) {
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <div className='card'>
            <Link to={`/product/${type}/${product.id}`}>
                <img  className='thumbnail' src={product.productThumbnail} alt={product.productName}/>
            </Link>
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
