import React, { useContext ,useState} from "react";
import Logo from "../../../olx-logo.png";
import { FirebaseContext } from "../../store/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(null)
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate()

 async function handleClick(e) {
    e.preventDefault();

    //handle authentication
    try {
      const userCredential = await signInWithEmailAndPassword(auth , email, password)//returns usercredential object
      const user = userCredential.user// it also contain an obj user with users information
      console.log('user logged in',user)
       navigate('/home')
    } catch (error) {
      setError(error.message)
      console.log('error in login',error.message);
      
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleClick}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
        {error&&<p style={{color:"red"}}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
