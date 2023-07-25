import { React } from 'react';
import './Auth.scss';
import { CircleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
export default function ({ children }) {
    const navigate = useNavigate();
    const { authLoading, isAuthenticated } = useSelector((state) => state.auth);
    if (isAuthenticated) {
        // navigate('/dashboard');
        // return;
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className="auth">
            <h1>LEARN IT</h1>
            <CircleLoader color="#36d7b7" />
            <h4>we may not talk but i still care</h4>
            {authLoading ? <CircleLoader color="#36d7b7" /> : children}
        </div>
    );
}
