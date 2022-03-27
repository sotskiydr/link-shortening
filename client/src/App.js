import React from 'react'
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes.js'
import { useAuth } from './hooks/auth.hook.js'
import {AuthContext} from './context/AuthContext.js'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'


function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

  if (!ready){
    return <Loader />
  }
  return (
      <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
        <Router>
            {isAuthenticated && <Navbar />}
          <div className="container">
              {routes}
          </div>
        </Router>
      </AuthContext.Provider>
  );
}

export default App
