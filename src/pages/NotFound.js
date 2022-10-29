import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate();

    return (
        <>
            <div>Login or Register Failed</div>
            <button onClick={() => navigate('/')}>go back to home</button>
        </>
    )
}

export default NotFound