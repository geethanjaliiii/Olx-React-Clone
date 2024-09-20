import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { FirebaseProvider } from './store/FirebaseContext'
import {auth, db} from '../src/firebase/config'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FirebaseProvider>
    <App />
    {/* the value of firebase can be accessed from anywhere inside app.js */}
    </FirebaseProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
