import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth'; // If you're using Firebase Authentication
import { getFirestore } from 'firebase/firestore';
// import other services you might use

const firebaseConfig = {
  apiKey: "AIzaSyB2PsAdGnFOi3dsd6xzVkEHuTuaeJdQ9NI",
  authDomain: "foodbridge-ec508.firebaseapp.com",
  projectId: "foodbridge-ec508",
  storageBucket: "foodbridge-ec508.appspot.com",
  messagingSenderId: "821561307492",
  appId: "1:821561307492:web:62ab95f89cf62907484a71",
  measurementId: "G-EXMK5XXCZN"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// export other services that you might use
