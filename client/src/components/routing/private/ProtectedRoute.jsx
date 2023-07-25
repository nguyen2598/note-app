import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import NavBar from '../../Layout/NavBar';

export default function ProtectedRoute({ element: Element, ...rest }) {
    const { authLoading, isAuthenticated } = useSelector((state) => state.auth);
    if (authLoading) return <CircleLoader color="#36d7b7" />;
    return isAuthenticated ? (
        <>
            <NavBar />
            {Element}
        </>
    ) : (
        <Navigate to="/login" />
    );
    // isAuthenticated ? <Element /> : <Navigate to="/login" />
}
