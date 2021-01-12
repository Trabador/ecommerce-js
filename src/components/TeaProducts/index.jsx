import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTeaProductsAction } from '../../redux'
import Product from '../Product'
import './styles.scss'

const mapState = ({ products }) => ({
    teaProducts: products.teaProducts
})

function TeaProducts() {
    const { teaProducts } = useSelector(mapState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTeaProductsAction())
    }, [dispatch])

    return (
        <div className='products'>
            {teaProducts.length >0 && 
            teaProducts.map(product => (
                <Product product={product} key={product.id} />
            ))}
        </div>
    )
}

export default TeaProducts
