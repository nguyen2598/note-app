import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { useEffect, useState } from 'react';
import authApi from './app/callApi/authApi';
import Dashboard from './components/views/Dashboard/Dashboard';
import ProtectedRoute from './components/routing/private/ProtectedRoute';
import About from './components/views/About/About';
import Auth from './components/views/Auth/Auth';
function App() {
    const [start, setStart] = useState(false);
    useEffect(() => {
        setStart(true);
        authApi.loadUser();
    }, []);
    return (
        <Router>
            {start && (
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route
                        path="/login"
                        element={
                            <Auth>
                                <LoginForm />
                            </Auth>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Auth>
                                <RegisterForm />
                            </Auth>
                        }
                    />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/about" element={<ProtectedRoute element={<About />} />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
