import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const config = {
  apiKey: "AIzaSyBA-lqUnFu8ZtHFtQ07lU4ksn-GExsm5O0",
   authDomain: "fir-app-react-d06e6.firebaseapp.com",
    projectId: "fir-app-react-d06e6",
    storageBucket: "fir-app-react-d06e6.appspot.com",
    messagingSenderId: "146851134716",
    appId: "1:146851134716:web:41235c15d1e162c1feeb79"
  };

  // Initialize Firebase
  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      } 
    }
    return userRef;
  };


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const sigInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;