import productTypes from './productsActionTypes'
import { firestore } from '../../firebase/utils'

export const fetchTeaProductsAction = () => dispatch => {
    firestore
        .collection('tea-products')
        .get()
        .then(snapshot => {
            const productsArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            dispatch({
                type: productTypes.FETCH_TEA_PRODUCTS,
                payload: productsArray
            })
        })
        .catch(err => console.log(err))
}

export const fetchCoffeeProductsAction = (startAfterDoc=false, previousData=[]) => dispatch => {
    const pageSize = 6

    let reference = firestore.collection('coffe-products').orderBy('createdAt').limit(pageSize)
    if(startAfterDoc) reference = reference.startAfter(startAfterDoc)

    reference
        .get()
        .then(snapshot => {
            const totalCount = snapshot.docs.length
            const lastQueried = snapshot.docs[totalCount-1]
            reference.startAfter(lastQueried).get()
                .then(snapAux => {
                    const futureCount = snapAux.docs.length
                    const data = snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            id: doc.id
                        }
                    })
                    dispatch({
                        type: productTypes.FETCH_COFEE_PRODUCTS,
                        payload: {
                            data: [...previousData, ...data],
                            lastQueried,
                            isLastPage: futureCount < 1
                        }
                    })
            })
        })
        .catch(err => console.log(err))
}


