import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/brand/Logo';
import API from '../services/api';
import { formatApiError } from '../utils/apiErrors';
import { warmApi } from '../utils/warmApi';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        warmApi();
    }, []);

    useEffect(() => {
        let cancelled = false;

        const checkToken = async () => {
            if (!token) {
                setTokenValid(false);
                setValidating(false);
                return;
            }
            try {
                const { data } = await API.get(`auth/reset-password/${token}`);
                if (!cancelled) setTokenValid(Boolean(data?.valid));
            } catch {
                if (!cancelled) setTokenValid(false);
            } finally {
                if (!cancelled) setValidating(false);
            }
        };

        checkToken();
        return () => {
            cancelled = true;
        };
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const { data } = await API.post('auth/reset-password', { token, password });
            setSuccess(data?.message || 'Password updated successfully.');
            setTimeout(() => navigate('/login', { replace: true }), 2500);
        } catch (err) {
            setError(formatApiError(err, 'Could not reset password. Please request a new link.'));
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
                        Set new password
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        Choose a strong password for your account.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-5 sm:p-8 space-y-5 w-full min-w-0">
                    {validating && (
                        <p className="text-center text-sm text-slate-500 font-medium py-4">Checking reset link…</p>
                    )}

                    {!validating && !tokenValid && !success && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <span>This reset link is invalid or has expired. Request a new one below.</span>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="block w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-200 transition-all flex items-center justify-center"
                            >
                                Request new link
                            </Link>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm font-medium">
                            <CheckCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{success} Redirecting to log in…</span>
                        </div>
                    )}

                    {!validating && tokenValid && !success && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="new-password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    New password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        id="new-password"
                                        type={showPw ? 'text' : 'password'}
                                        required
                                        minLength={6}
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-12 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw((v) => !v)}
                                        className="absolute inset-y-0 right-0 flex items-center justify-center tap-target-icon pr-2 text-slate-400 hover:text-violet-600"
                                        aria-label={showPw ? 'Hide password' : 'Show password'}
                                    >
                                        {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="confirm-password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    <input
                                        id="confirm-password"
                                        type={showPw ? 'text' : 'password'}
                                        required
                                        minLength={6}
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
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
                                        Updating…
                                    </>
                                ) : (
                                    'Update password'
                                )}
                            </button>
                        </form>
                    )}

                    <p className="text-center text-sm text-slate-500 font-medium pt-1">
                        <Link to="/login" className="text-violet-600 hover:text-violet-700 font-bold underline underline-offset-2">
                            Back to log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
