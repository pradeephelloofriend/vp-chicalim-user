import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {

    apiKey: "AIzaSyCsi0C05blh_SFS8NO_YTLWzJjeAoT0-x4",

    authDomain: "vp-chicalim.firebaseapp.com",
  
    projectId: "vp-chicalim",
  
    storageBucket: "vp-chicalim.appspot.com",
  
    messagingSenderId: "116311674189",
  
    appId: "1:116311674189:web:e2833a1922e636f991bb04",
  
    measurementId: "G-6NRLTXFQR3"
  
  
  };
export const createUserProfileDocument = async (userAuth,additionalData,mNo) => {
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
                mNo,
                createdDate,
                ...additionalData,
                ...mNo
                
                
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