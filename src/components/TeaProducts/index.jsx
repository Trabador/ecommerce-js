import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTeaProductsAction } from '../../redux'
import Product from '../Product'
import LoadMore from '../LoadMore'
import SearchBar from '../SearchBar'
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

    const onLoadMore = () => {
        dispatch(fetchTeaProductsAction(teaProducts.lastQueried, teaProducts.data))
    }

    return (
        <div className='container'>
            <SearchBar productCategory='tea'/>
            <div className='products'>
                {teaProducts.data?
                    teaProducts.data.length >0 && 
                    teaProducts.data.map(product => (
                    <Product product={product} key={product.id} type='tea'/>
                    )): null
                }
            </div>
            {!teaProducts.isLastPage && <LoadMore onClick={onLoadMore}/>}
        </div>
        
    )
}

export default TeaProducts
