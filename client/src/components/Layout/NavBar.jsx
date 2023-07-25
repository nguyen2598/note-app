import React, { useState } from 'react';
import logo from '../../assest/logo.webp';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authApi from '../../app/callApi/authApi';
import './index.scss';
import { BiSolidUserCircle } from 'react-icons/bi';
export default function NavBar() {
    const { user } = useSelector((state) => state.auth);
    const logout = () => {
        authApi.logoutUser();
    };
    const [isMenu, setIsMenu] = useState(false);
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav className="nav">
                <Link to="/dashboard" className="link">
                    Dashboard
                </Link>
                <Link to="/about" className="link">
                    About
                </Link>
            </nav>
            <div className="user">
                <div className="profile" onClick={() => setIsMenu((prev) => !prev)}>
                    <BiSolidUserCircle size={28} />
                </div>
                {isMenu ? (
                    <div className="navMenu">
                        <div className="name_user">Welcome {user.username}</div>
                        <button onClick={logout}>Logout </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
