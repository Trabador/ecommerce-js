import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCartAction } from '../../redux' 
import Buttons from '../forms/Buttons'
import './styles.scss'


function Product({ product , type }) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)

    const handleOnClick = () =>{
        if(!currentUser) return
        if(!product) return
        dispatch(addItemToCartAction({ userId: currentUser.id , toAdd: product }))
    }

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
                <Buttons onClick={handleOnClick}>
                    Add to cart
                </Buttons>
            }
        </div>
    )
}

export default Product
