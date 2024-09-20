import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const storage = getStorage(); //Initialize storage
  useEffect(() => {
    //listen to authentication state changes
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // if logged in set userdata
        console.log(user);
      } else {
        setCurrentUser(null); // if logged out set user to null
      }
    });
    //cleanup code works inside return when component unmounts-remove subscriptions
    return () => unSubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ db, auth, currentUser, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
