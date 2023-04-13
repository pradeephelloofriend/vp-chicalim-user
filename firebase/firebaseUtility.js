import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyC-sQgenGOjvaiaCiiJfGjcxQ0elnce14I",
  
    authDomain: "village-panchayt.firebaseapp.com",
  
    projectId: "village-panchayt",
  
    storageBucket: "village-panchayt.appspot.com",
  
    messagingSenderId: "330692708351",
  
    appId: "1:330692708351:web:3d60b3aaeadc898dec49ca",
  
    measurementId: "G-C6P0V59CS9"
  
  };
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
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();//db
//set up google authunication
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const logout = () => auth.signOut()
export const resetPassword = () => auth.sendPasswordResetEmail()
export const guestUser = () => auth.signInAnonymously()

export default firebase;