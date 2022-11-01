import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from "../Firebase";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, pwd)
    .then(auth => {
      navigate('/');
      return setDoc(doc(collection(db, 'users'), auth.user.uid), {film_id: []});
    })
    .catch(err => {console.error(err); navigate('/notfound')})
  };

  const registerNewUser = () => {
    createUserWithEmailAndPassword(auth, email, pwd)
    .then(auth => {
      navigate('/');
      return setDoc(doc(collection(db, 'users'), auth.user.uid), {film_id: []});
    })
    .catch(err => navigate('/notfound'))
  };

  return (
    <>
      <Header />
      <div className="login-contenair">
        <p>Connectez-vous</p>
        <input onChange={(e) => setEmail(e.target.value)} type="text" className='mail-input' name='mail' placeholder='email'/>
        <input onChange={(e) => setPwd(e.target.value)} type="password" className='pwd-input' name='pwd' placeholder='password'/>
        <button onClick={signIn} className='login-button' >Se connecter</button>
        <p>Pas encore de compte ?</p>
					{/* <NavLink to ="/coup-de-coeur" className={(nav) => (nav.isActive ? "nav-active" : "")}> */}
            <button onClick={registerNewUser} className='register-button' >Créer un compte</button>
          {/* </NavLink> */}

      </div>
    </>
  )
}

export default Login