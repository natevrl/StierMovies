import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div className='header'>
			<nav>
				<ul>
					<NavLink exact to ="/" className={(nav) => (nav.isActive ? "nav-active" : "")}><li>Accueil</li></NavLink>
					<NavLink exact to ="/coup-de-coeur" className={(nav) => (nav.isActive ? "nav-active" : "")}><li>Coup de coeur</li></NavLink>
				</ul>
			</nav>
			<h1>Movies Handler</h1>
		</div>
	);
};

export default Header;