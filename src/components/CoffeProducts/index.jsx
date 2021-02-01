import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoffeeProductsAction } from '../../redux'
import LoadMore from '../LoadMore'
import Product from '../Product'
import SearchBar from '../SearchBar'
import './styles.scss'

const mapState = ({ products }) => ({
    coffeeProducts: products.coffeeProducts
})

function CoffeProducts() {
    const { coffeeProducts } = useSelector(mapState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCoffeeProductsAction())
    }, [dispatch])

    const onLoadMore = () => {
        dispatch(fetchCoffeeProductsAction(coffeeProducts.lastQueried, coffeeProducts.data))
    }

    return (
        <div className='container'>
            <SearchBar productCategory='coffee'/>
            <div className='products'>
            {
                coffeeProducts.data? 
                    coffeeProducts.data.length > 0 && 
                    coffeeProducts.data.map(product => (
                        <Product product={product} key={product.id} type='coffee'/>
                    ))
                    : null
            }
            </div>
            {!coffeeProducts.isLastPage && <LoadMore onClick={onLoadMore}/>}
        </div>
    )
}

export default CoffeProducts
