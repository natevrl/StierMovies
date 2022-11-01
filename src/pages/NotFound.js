import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';

function NotFound() {

    const navigate = useNavigate();

    return (
        <>
            <div>Login or Register Failed</div>
            <button onClick={() => navigate('/login')}>Try Again</button>
        </>
    )
}

export default NotFound