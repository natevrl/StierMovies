import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from "../Firebase";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


function Register() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const registerNewUser = () => {
    createUserWithEmailAndPassword(auth, email, pwd)
    .then(auth => {
      navigate('/home');
      return setDoc(doc(collection(db, 'users'), auth.user.uid), {film_id: []});
    })
    .catch(err => navigate('/notfound'))
  };

  return (
    <>
      <div className="register-contenair">
        <p>Inscrivez-vous</p>
        <input onChange={(e) => setEmail(e.target.value)} type="text" className='mail-input' name='mail' placeholder='email'/>
        <input onChange={(e) => setPwd(e.target.value)} type="password" className='pwd-input' name='pwd' placeholder='password'/>
        <button onClick={registerNewUser} className='register-button' >S'inscrire</button>

      </div>
    </>
  )
}

export default Register