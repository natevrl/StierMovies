import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from "../Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useState } from 'react';



const Header = () => {
	const [user, loading, error]= useAuthState(auth);
  const [isLogged, setIsLogged] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', changeWindowSize);
    return (() => { window.removeEventListener('resize', changeWindowSize) });
  }, []);


  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        setIsLogged(true)
      }
      else {setIsLogged(false)}

      }) ;
      return () => {unlisten()};
  }, []);


	return (
		<div className='header'>
			<nav>
				<ul>
					<NavLink to="/home" className={(nav) => (nav.isActive ? "nav-active" : "")}>{windowSize < 540 ? (<i className="fas fa-home"></i>) : (<li>Accueil</li>)}</NavLink>
					<NavLink to="/coup-de-coeur" className={(nav) => (nav.isActive ? "nav-active" : "")}>{windowSize < 540 ? (<i class="fas fa-heart"></i>) : (<li>Coups de coeur</li>)}</NavLink>
          {isLogged ? 
            <a onClick={() => auth.signOut()} className="connect">{windowSize < 440 ? (<i className="fas fa-images"></i>) : (<li>Se connecter</li>)}</a> : 
            <NavLink to="/login" className={(nav) => (nav.isActive ? "nav-active" : "connect")}>{windowSize < 540 ? (<i className="fas fa-user"></i>) : (<li>Se deconnecter</li>)}</NavLink>}
				</ul>
			</nav>
			<h1>S T I E R</h1>
		</div>
	);
};

export default Header;