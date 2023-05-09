import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext } from 'react';

export const Context = createContext({ isAuthenticated: false })

export const serverURL = "https://better-fox-yoke.cyclic.app"

const AppWrapper = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState()
  const [user, setUser] = useState('')
  const [task, setTask] = useState('')

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        userId, setUserId,
        task, setTask
      }}
    >
      <App />
    </Context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);