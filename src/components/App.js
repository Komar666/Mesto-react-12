import React, { useState, useEffect } from "react";
import { Navigate , Route, Routes } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import authApi from "../utils/AuthApi"

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(() => {
  }, []);

  function handleUserRegister ({ email, password }) {
    authApi.register({ email, password })
      .then((userData) => {
        setCurrentUser(userData.data)
        console.log(`🔑 [App] Success handleUserRegister, data: ${JSON.stringify(userData)}`)
      }).catch((e) => {
        console.log(`❌ [App] Error while handleUserRegister ${JSON.stringify(e)}`)
      })
  }

  function handleUserAuthorize ({ email, password }) {
    authApi.authorize({ email, password })
      .then((token) => {
        console.log(`🔑 [App] Success while handleUserAuthorize, token: ${JSON.stringify(token)}`)
      }).catch((e) => {
        console.log(`❌ [App] Error while handleUserAuthorize ${JSON.stringify(e)}`)
      })
  }


  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, loggedIn}}>

      <div className="page">

        <Header />

        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/sign-in" element={
            <Login onAuthorize={handleUserAuthorize} />
          }/>

          <Route path="/sign-up" element={
            <Register onRegister={handleUserRegister} />
          }/>

        </Routes>

        <Footer />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
