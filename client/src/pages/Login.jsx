import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { LoginDemo } from '../components/LoginDemo';

const Login = () => {
    const [error, setError] = useState('');
    const { user, login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse.credential);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Google login failed');
        }
    };

    const handleGoogleError = () => {
        setError('Google login was unsuccessful');
    };

    const handleSubmit = async (email, password) => {
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    const googleComponent = (
        <div className="flex justify-center w-full">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
            />
        </div>
    );

    return (
        <LoginDemo 
            onSubmit={handleSubmit} 
            googleComponent={googleComponent}
            error={error}
            onGoogleSuccess={handleGoogleSuccess}
            onGoogleError={handleGoogleError}
        />
    );
};

export default Login;
