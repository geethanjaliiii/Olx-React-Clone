import {initializeApp} from "firebase/app";
import {getAuth}from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const API_KEY=import.meta.env.VITE_API_KEY

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "olx-clone-3d8f1.firebaseapp.com",
    projectId: "olx-clone-3d8f1",
    storageBucket: "olx-clone-3d8f1.appspot.com",
    messagingSenderId: "438023750695",
    appId: "1:438023750695:web:4e10b5d4c8bca4b91d3a02",
    measurementId: "G-PXW6ZNXY5N"
  };

  //Initialize firebase
  const app=initializeApp(firebaseConfig);
   const auth =getAuth(app);
 const db =getFirestore(app);
// export default app;
  export  {auth,db}
 

