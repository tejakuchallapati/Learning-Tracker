import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const { user, register, googleLogin } = useContext(AuthContext);
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
            setError(err.response?.data?.message || 'Google sign up failed');
        }
    };

    const handleGoogleError = () => {
        setError('Google sign up was unsuccessful');
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" name="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" name="confirmPassword" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">Sign up</button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            />
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
