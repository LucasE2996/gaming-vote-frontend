// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import Api from '../services/Api';

import './Login.css';
import wintaylorLogo from '../assets/wintaylor_logo.svg';

function Login({ history }) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState(');');
    const [errorStyle, setErrorStyle] = useState({
        display: 'none',
    });

    useEffect(() => {
        const id = localStorage.getItem('user');
        if (id) {
            history.push(`/main/${id}`);
        }
    }, [history]);

    async function handleSubmit(event) {
        event.preventDefault();

        const result = await Api.post('sessions', {
            email: userEmail,
            password: userPassword,
        }).catch(error => {
            console.error(error);
        });

        if (!result) {
            setErrorStyle({
                display: 'block',
            });
            return;
        }

        const { user, token } = result.data;

        setErrorStyle({ display: 'none' });
        localStorage.setItem('token', token);

        if (user.name === 'wintaylorAdmin426') {
            history.push(`/admin`);
        } else {
            history.push(`/main/${user.id}`);
        }
    }

    return (
        <div className="login-container">
            <h2> Game Voting </h2>{' '}
            <img src={wintaylorLogo} alt="Wintaylor Logo" />
            <form onSubmit={handleSubmit}>
                <input
                    className="box"
                    type="text"
                    placeholder="Enter with your business email"
                    onChange={e => setUserEmail(e.target.value)}
                    required
                />
                <div className="error-box" style={errorStyle}>
                    <p> Invalid password or email </p>
                </div>
                <input
                    className="box"
                    type="password"
                    placeholder="Password"
                    onChange={e => setUserPassword(e.target.value)}
                    required
                />
                <button className="box" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
