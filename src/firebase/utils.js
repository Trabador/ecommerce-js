import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => {
    auth.signInWithPopup(GoogleProvider)
}

export const handleUserProfile = (userAuth, extraData) => {
    return new Promise(async (resolve, reject) => {
        if(!userAuth){
            reject()
        }
        const { uid } = userAuth
        const userRef = firestore.doc(`users/${uid}`)
        const snapshot = await userRef.get()
        if(!snapshot.exists){
            const { displayName,email } = userAuth
            try{
                const newUser = {
                    displayName,
                    email,
                    cart: [],
                    createdAt: new Date(),
                    ...extraData
                }
                await userRef.set(newUser)
                resolve(userRef)
            }
            catch(err){
                console.log(err)
                reject(err)
            }
        }
        resolve(userRef)
    })
}


