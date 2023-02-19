import React, { useState, useEffect } from "react";
import { Navigate , Route, Routes, useNavigate } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import authApi from "../utils/AuthApi"

import InfoTooltip from "./InfoTooltip"

import { createStandaloneToast } from '@chakra-ui/toast'

function App(_props) {
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false)

  const navigate = useNavigate()

  const getJWT = () => localStorage.getItem('auth-token');
  const setJWT = (token) => { localStorage.setItem('auth-token', token) };

  const { ToastContainer } = createStandaloneToast()

  useEffect(() => {
    if (authToken) { fetchUserMe() }
  }, [authToken])

  useEffect(() => {
    if (currentUser != null) {
      setLoggedIn(true)
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    const authToken = getJWT()
    if (authToken !== 'null') { setAuthToken(authToken) }
    setInitialLoaded(true)
  }, []);


  const handleLogout = () => { setJWT(null); setAuthToken(null); setCurrentUser(null); navigate('/sign-in') }

  function handleUserRegister ({ email, password }) {
    authApi.register({ email, password })
      .then((userData) => {
        console.log(`🔑 [App] Success handleUserRegister, data: ${JSON.stringify(userData)}`)
        // WAIT TO FIX TOO MANY REQUEST ERROR FROM SERVER
        setTimeout(() => {
          setInfoTooltipOpen(true)
          handleUserAuthorize({ email, password })
        }, 500)
      }).catch((e) => {
        console.log(`❌ [App] Error while handleUserRegister ${JSON.stringify(e)}`)
      })
  }

  function handleUserAuthorize ({ email, password }) {
    authApi.authorize({ email, password })
      .then((resp) => {
        console.log(`🔑 [App] Success while handleUserAuthorize, data: ${JSON.stringify(resp.token)}`);
        setJWT(resp.token);
        setAuthToken(resp.token);
      }).catch((e) => {
        console.log(`❌ [App] Error while handleUserAuthorize ${JSON.stringify(e)}`);
        throw e
      })
  }

  async function fetchUserMe () {
    const token = authToken
    if (token == null || currentUser != null) { return }
    console.log('token is', token)
    authApi.fetchUserMe({ token })
      .then((userData) => {
        console.log(`✅ [App] Success fetchUserMe, data: ${JSON.stringify(userData || '')}`);
        (userData.data !== 'undefined') && setCurrentUser(userData.data);
        // setLoggedIn(true)
        // console.log('user is', userData.data, currentUser)
      }).catch((e) => {
        console.log(`❌ [App] Error while fetchUserMe ${JSON.stringify(e)}`)
        throw e
      })
  }


  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, currentProfile, setCurrentProfile, loggedIn, handleLogout }}>

      <div className="page">

        <Header />
        { initialLoaded &&
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/sign-in" element={
            <Login onAuthorize={handleUserAuthorize} />
          }/>

          <Route path="/sign-up" element={
            <Register onRegister={handleUserRegister} />
          }/>
          {/* Return any unknown route to protected component */}
          <Route path="*" element={<ProtectedRoute />} />

        </Routes>
        }

        <Footer />
        <ToastContainer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={() => { setInfoTooltipOpen(false) }}
        />
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
