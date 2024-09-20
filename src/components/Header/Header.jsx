import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { FirebaseContext } from '../../store/FirebaseContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

function Header() {
  const {currentUser}= useContext(FirebaseContext);
  const navigate = useNavigate();
  // console.log(currentUser.displayName??"name not updated");
  
  function handleLogout(){
signOut(auth)
console.log("user logged out successfully");
navigate('/home')

  }
  return (

   
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{navigate('/')}}>{currentUser?`Welcome, ${currentUser.displayName}`:"Login"}</span>
          <hr />
        </div>
        {currentUser&&<button className='logout' onClick={handleLogout}>Logout</button>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{navigate('/create')}}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
