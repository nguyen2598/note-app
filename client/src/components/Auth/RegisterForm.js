import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../../app/callApi/authApi';

export default function RegisterForm() {
    const [registerForm, setRegisterForm] = useState({
        email: '',
        username: '',
        password: '',
    });
    const { email, username, password } = registerForm;
    const onChangeRegisterForm = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };
    const register = async (e) => {
        e.preventDefault();
        try {
            const registerData = await authApi.registerUser(registerForm);
            if (registerData.success) {
                // navigate('/dashboard');
            } else {
            }
        } catch (error) {}
    };
    return (
        <>
            <form onSubmit={register}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-input"
                        name="email"
                        placeholder=" "
                        value={email}
                        onChange={onChangeRegisterForm}
                    />
                    <label htmlFor="name" className="form-label">
                        email
                    </label>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-input"
                        name="username"
                        placeholder=" "
                        value={username}
                        onChange={onChangeRegisterForm}
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
                        placeholder=" "
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                    <label htmlFor="name" className="form-label">
                        password
                    </label>
                </div>
                <div className="form-group">
                    <input type="password" className="form-input" name="password" placeholder=" " />
                    <label htmlFor="name" className="form-label">
                        confirm
                    </label>
                </div>
                <button>Submit</button>
            </form>
            <p className="redirect-form">
                Already have an account?
                <Link to="/login">Login</Link>
            </p>
        </>
    );
}
