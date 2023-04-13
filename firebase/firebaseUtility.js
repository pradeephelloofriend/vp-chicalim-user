import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const config = {

    apiKey: "AIzaSyCfJfJ4Z9eBkGkvT87wGGtkrK6kxIPfHBU",

  authDomain: "vp-nagoa.firebaseapp.com",

  projectId: "vp-nagoa",

  storageBucket: "vp-nagoa.appspot.com",

  messagingSenderId: "791183576661",

  appId: "1:791183576661:web:6b827d7dfa53a7021e0edc",

  measurementId: "G-HBJ80NJQH6"



}
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    //console.warn('get user', snapShot)
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdDate = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdDate,
                ...additionalData
            })

        } catch (error) {

        }
    }
    return userRef;
}

//end

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();//db
//set up google authunication
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const logout = () => auth.signOut()
export const resetPassword = () => auth.sendPasswordResetEmail()
export const guestUser = () => auth.signInAnonymously()

export default firebase;