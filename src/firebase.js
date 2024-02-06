import { initializeApp } from 'firebase/app';

// auth
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

//FireStore
import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaP1X7Les28EkXUZQ4lqpBYyD-HuGS0F0",
  authDomain: "blog-fb1eb.firebaseapp.com",
  projectId: "blog-fb1eb",
  storageBucket: "blog-fb1eb.appspot.com",
  messagingSenderId: "705965517277",
  appId: "1:705965517277:web:12137608382e3df75d2e34"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
