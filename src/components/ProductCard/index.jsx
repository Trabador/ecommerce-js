import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductDetailsAction, resetProductDetailsAction, addItemToCartAction } from '../../redux'
import Buttons from '../forms/Buttons'
import './styles.scss'

const mapState = ({ products, user }) => ({ 
    productDetails: products.productDetails,
    currentUser: user.currentUser
})

function ProductCard() {
    const dispatch = useDispatch()
    const { productId, type } = useParams()
    const { productDetails, currentUser } = useSelector(mapState)

    useEffect(() => {
        dispatch(fetchProductDetailsAction(productId, type))

        return () => {
            dispatch(resetProductDetailsAction())
        }
    }, [dispatch, productId, type])

    const handleOnClick = (e) => {
        e.preventDefault()
        if(!currentUser) return 
        if(!productDetails) return
        const toAdd = {
            ...productDetails,
            id: productId
        }
        dispatch(addItemToCartAction({ userId: currentUser.id, toAdd}))

    }

    if(productDetails){
        return (
            <div className='product-card'>
                <div className='image'>
                    <img src={productDetails.productThumbnail} alt={productDetails.productName}/>
                </div>
                <div className='details'>
                    <ul>
                        <li>
                            <h2>
                                {productDetails.productName}
                            </h2>
                        </li>
                        <li>
                            <span>$ {productDetails.productPrice}</span>
                        </li>
                        {currentUser
                            ?   <li>
                                    <div className='addToCart'>
                                        <Buttons type='button' onClick={handleOnClick}>
                                            Add to Cart
                                        </Buttons>
                                    </div>
                                </li>
                            :null
                        }
                        <li>
                            {productDetails.productDescription}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return null    
}

export default ProductCard
