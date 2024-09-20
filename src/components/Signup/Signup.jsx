import React, { useState, useContext } from "react";
import Logo from "../../../olx-logo.png";
import { FirebaseContext } from "../../store/FirebaseContext";
import './Signup.css';

import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage]=useState('')
  const { db } = useContext(FirebaseContext)
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit=async (e)=>{
    e.preventDefault() 
    setErrorMessage('')// clearing previous error
    //validateform()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      //updating profile to include username
      await updateProfile(user, {displayName: username})
      console.log("username updated");
      
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
       username,
        email,
        phone,
      });

      console.log('User data added to Firestore');
      navigate('/')

    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage(error.code)
      handleError(error)
    }

   
  }
  function handleError(error){
    switch(error.code){
      case 'auth/email-already-in-use':
        setErrorMessage('The email address is already in use.');
        break;
      case 'auth/invalid-email':
      setErrorMessage('The email address is invalid.');
      break;
      case 'auth/weak-password':
        setErrorMessage('The password is too weak. Please choose a stronger password.');
        break;
      default:
        setErrorMessage('An error occurred during sign up. Please try again.');
        break;
    }
    
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
           required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{navigate('/')}}>Login</a>
        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
      </div>
    </div>
  );
}
