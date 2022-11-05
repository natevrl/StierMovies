import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

const Home = () => {

	const [user, loading, error]= useAuthState(auth);

	return (
		<>
			<h1>Bienvenue {user?.email}</h1>
			<Form />
		</>
	);
};

export default Home;