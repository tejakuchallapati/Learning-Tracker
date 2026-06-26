import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import Logo from '../components/brand/Logo';
import API from '../services/api';
import { formatApiError } from '../utils/apiErrors';
import { warmApi } from '../utils/warmApi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        warmApi();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const { data } = await API.post('auth/forgot-password', { email: email.trim() });
            setSuccess(data?.message || 'Check your email for a reset link.');
        } catch (err) {
            setError(formatApiError(err, 'Could not send reset email. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/40 flex items-center justify-center px-4 py-12 max-md:min-h-[100dvh] max-md:py-8 overflow-x-hidden">
            <div className="w-full max-w-md min-w-0">
                <div className="text-center mb-8">
                    <Logo className="w-14 h-14 mb-4 shadow-xl shadow-sky-200/80 rounded-2xl mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Forgot password?
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        Enter your email and we&apos;ll send you a reset link.
                    </p>
                    <p className="text-slate-400 text-xs mt-2 font-medium">
                        Signed up with Google? Use{' '}
                        <Link to="/login" className="text-violet-600 font-bold underline underline-offset-2">
                            Sign in with Google
                        </Link>{' '}
                        on the log in page — no password reset needed.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-5 sm:p-8 space-y-5 w-full min-w-0">
                    {error && (
                        <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success ? (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-medium">
                                <CheckCircle size={18} className="shrink-0 mt-0.5" />
                                <span>{success}</span>
                            </div>
                            <Link
                                to="/login"
                                className="block w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-200 transition-all flex items-center justify-center"
                            >
                                Back to log in
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="forgot-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        id="forgot-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-200 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Sending…
                                    </>
                                ) : (
                                    'Send reset link'
                                )}
                            </button>
                        </form>
                    )}

                    <p className="text-center text-sm text-slate-500 font-medium pt-1">
                        Remember your password?{' '}
                        <Link to="/login" className="text-violet-600 hover:text-violet-700 font-bold underline underline-offset-2">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
