import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Join the Elite</h2>
                <p className="mt-2 text-center text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Initialize your mastery protocol</p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-slate-900 py-10 px-8 shadow-3xl border border-slate-200 dark:border-slate-800 sm:rounded-[2rem] sm:px-12 transition-all">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold border border-rose-100 dark:border-rose-900/50">{error}</div>}

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Identification</label>
                            <input type="text" name="name" required placeholder="Full Name" className="block w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Communication Terminal</label>
                            <input type="email" name="email" required placeholder="Email Address" className="block w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Access Protocol</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} name="password" required placeholder="Security Key" className="block w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 pr-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" onChange={handleChange} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-violet-600 transition-colors">
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Verify Protocol</label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required placeholder="Repeat Security Key" className="block w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 pr-12 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" onChange={handleChange} />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-violet-600 transition-colors">
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full flex justify-center py-4 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-violet-200 dark:shadow-none transition-all transform active:scale-[0.98]">Authorize Account &rarr;</button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                                <span className="px-3 bg-white dark:bg-slate-900 text-slate-400">Collaborative Entry</span>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            />
                        </div>
                    </div>

                    <div className="mt-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Already have an active protocol? <Link to="/login" className="text-violet-600 hover:text-violet-700 underline underline-offset-4">Sign in &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
