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

export const handleUserProfile = async (userAuth, additionalData) => {
    if(!userAuth) return

    const { uid, displayName, email } = userAuth
    const userRef = firestore.doc(`users/${uid}`)
    const snapshot = await userRef.get()

    if(!snapshot.exists){
        try{
            const newUser = {
                displayName,
                email,
                createdAt: new Date(),
                ...additionalData
            }
            await userRef.set(newUser)
        }catch(err){
            console.log(err)
        }
    }

    return userRef
}

