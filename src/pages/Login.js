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

  return (
    <>
      <div className="login-contenair">
        <p>Connectez-vous</p>
        <input onChange={(e) => setEmail(e.target.value)} type="text" className='mail-input' name='mail' placeholder='email'/>
        <input onChange={(e) => setPwd(e.target.value)} type="password" className='pwd-input' name='pwd' placeholder='password'/>
        <button onClick={signIn} className='login-button' >Se connecter</button>
        <p>Pas encore de compte ?</p>
        <button onClick={() => navigate('/register')} className='register-button' >Créer un compte</button>

      </div>
    </>
  )
}

export default Login