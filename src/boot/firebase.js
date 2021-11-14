import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZnB5WeQkyIHuw8IF3LRQ3HBj9MvRQw4",
  authDomain: "quitter-529f8.firebaseapp.com",
  projectId: "quitter-529f8",
  storageBucket: "quitter-529f8.appspot.com",
  messagingSenderId: "426357363863",
  appId: "1:426357363863:web:9f7fad900b7271199305d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db

