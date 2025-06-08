import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CssBaseline} from "@mui/material"
import {BrowserRouter as Router,  Routes, Route,Link} from "react-router-dom"

import { SnackbarProvider } from 'notistack';
createRoot(document.getElementById('root')).render(
  <>
    <Router>
         <SnackbarProvider maxSnack={3} autoHideDuration={3000}  anchorOrigin={{vertical: 'top',horizontal: 'center' }}>

          <App />
        </SnackbarProvider>
    </Router>
    
  </>
)
