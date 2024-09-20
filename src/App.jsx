import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/PostDetails';
function App() {
  return (
    <div>
      
        <Post>
          <Routes>
          <Route path='/signup' element={<Signup/>}  />
      <Route path='/home' element={<Home/>}  />
      <Route path='/create' element={<Create/>}  />
      <Route path='/' element={<Login/>}  />
      <Route path='/view' element={<ViewPost/>}  />
          </Routes>
       
        </Post>

     
    </div>
  );
}

export default App;


