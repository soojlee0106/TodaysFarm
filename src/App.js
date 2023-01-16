import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Form from './pages/Form';
import { auth } from './firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  let navigate = useNavigate();
  const authentication = getAuth();

  const handleAction = (id) => {
    if (id === 1) {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }

    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])

  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path='/'
        element={
          <Form
            title="Login"
            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(1)}
          />}
      />

      <Route
        path='/register'
        element={
          <Form
            title="Register"
            setEmail={setEmail}
            setPassword={setPassword}
            handleAction={() => handleAction(2)}
          />}
      />

    </Routes>
  );
};

export default App;