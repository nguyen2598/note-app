import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../app/callApi/authApi';

export default function LoginForm() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const { username, password } = loginForm;
    const onChangeLoginForm = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };
    const login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await authApi.loginUser(loginForm);
            if (loginData.success) {
                // navigate('/dashboard');
            } else {
            }
        } catch (error) {}
    };
    return (
        <>
            <form onSubmit={login}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-input"
                        name="username"
                        autoComplete="current-password"
                        defaultValue={username}
                        onChange={onChangeLoginForm}
                    />
                    <label htmlFor="name" className="form-label">
                        name
                    </label>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-input"
                        name="password"
                        autoComplete="current-password"
                        defaultValue={password}
                        onChange={onChangeLoginForm}
                    />
                    <label htmlFor="name" className="form-label">
                        password
                    </label>
                </div>

                <button>Submit</button>
            </form>
            <p className="redirect-form">
                Don't have an account?
                <Link to="/register">Register</Link>
            </p>
        </>
    );
}
