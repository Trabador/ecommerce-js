import productTypes from './productsActionTypes'
import { firestore } from '../../firebase/utils'

const pageSize = 6
const teaDB = process.env.REACT_APP_TEA_DB
const coffeeDB = process.env.REACT_APP_COFFE_DB

export const fetchTeaProductsAction = (startAfterDoc=false, previousData=[]) => dispatch => {
    let reference = firestore.collection(teaDB).orderBy('createdAt').limit(pageSize)
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
                        type: productTypes.FETCH_TEA_PRODUCTS,
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



export const fetchCoffeeProductsAction = (startAfterDoc=false, previousData=[]) => dispatch => {
    let reference = firestore.collection(coffeeDB).orderBy('createdAt').limit(pageSize)
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

export const searchCoffeProductsAction = ({ criteria }) => dispatch => {
    let referece = firestore.collection(coffeeDB)
    const query = referece.where('productName', '==', criteria)
    
    query
        .get()
        .then(snapshot =>{
            const resultArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            dispatch({
                type: productTypes.SEARCH_COFFE_PRODUCTS,
                payload: {
                    data: resultArray,
                    isLastPage: true
                }
            })
        })
        .catch(err => console.log(err))    
}

export const fetchProductDetailsAction = (productId, type) => dispatch => {
    let DB 
    if(type === 'coffee') DB = coffeeDB
    else DB = teaDB
    const reference = firestore.collection(DB).doc(productId)
    reference
        .get()
        .then(snapshot => {
            dispatch({
                type: productTypes.FETCH_PRODUCT,
                payload: snapshot.data()
            })
        })
        .catch(err => console.log(err))
}

export const resetProductDetailsAction = () => {
    return {
        type: productTypes.RESET_PRODUCT,
        payload: {}
    }
}

