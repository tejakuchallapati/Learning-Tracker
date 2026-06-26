import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ResponsiveGoogleLogin from '../components/auth/ResponsiveGoogleLogin';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import Logo from '../components/brand/Logo';
import { prefetchDashboard } from '../utils/prefetchDashboard';
import { formatApiError } from '../utils/apiErrors';
import { warmApi } from '../utils/warmApi';
import { getHomePath } from '../utils/authSession';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const { user, login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate(getHomePath(user), { replace: true });
    }, [user, navigate]);

    useEffect(() => {
        warmApi();
    }, []);

    const goToApp = (session) => {
        if (!session?.isAdmin) prefetchDashboard();
        navigate(getHomePath(session), { replace: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const session = await login(email, password);
            goToApp(session);
        } catch (err) {
            setError(formatApiError(err, 'Incorrect email or password. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        if (!credentialResponse?.credential) {
            setError('Google did not return a sign-in token. Please try again.');
            return;
        }
        setGoogleLoading(true);
        try {
            const session = await googleLogin(credentialResponse.credential);
            goToApp(session);
        } catch (err) {
            const serverMsg = err?.response?.data?.message;
            setError(
                formatApiError(
                    err,
                    serverMsg ||
                        'Google sign-in failed. Check that VITE_GOOGLE_CLIENT_ID on Vercel matches your Google Cloud OAuth client.'
                )
            );
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError(
            'Google sign-in was cancelled or blocked. Allow pop-ups for this site, then try again.'
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/40 flex items-center justify-center px-4 py-12 max-md:min-h-[100dvh] max-md:py-8 overflow-x-hidden">
            <div className="w-full max-w-md min-w-0">
                <div className="text-center mb-8">
                    <Logo className="w-14 h-14 mb-4 shadow-xl shadow-sky-200/80 rounded-2xl mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        Already have an account? Log in to continue.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-5 sm:p-8 space-y-5 w-full min-w-0">
                    {error && (
                        <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <div>
                                <span>{error}</span>
                                {error.includes('Google Sign-In') && (
                                    <p className="mt-2 text-rose-600/90 text-xs font-semibold">
                                        Use the Google button above to sign in. You can add an email password later in Settings.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Log in with Google
                        </p>
                        {googleLoading ? (
                            <div className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-500">
                                <span className="w-4 h-4 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
                                Signing in with Google…
                            </div>
                        ) : (
                            <ResponsiveGoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                text="signin_with"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-100" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            or with email
                        </span>
                        <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    id="login-email"
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

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-bold text-violet-600 hover:text-violet-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    id="login-password"
                                    type={showPw ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw((v) => !v)}
                                    className="absolute inset-y-0 right-0 flex items-center justify-center tap-target-icon pr-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                                    aria-label={showPw ? 'Hide password' : 'Show password'}
                                >
                                    {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || googleLoading}
                            className="w-full h-12 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 max-md:min-h-12 max-md:btn-text-safe"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Logging in…
                                </>
                            ) : (
                                'Log in →'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 font-medium pt-1">
                        New to Learning Tracker?{' '}
                        <Link
                            to="/signup"
                            className="text-violet-600 hover:text-violet-700 font-bold underline underline-offset-2"
                        >
                            Sign up free
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                    Click <span className="font-semibold">Sign in with Google</span>, then choose your
                    Google account. Allow pop-ups if the account picker does not appear.
                </p>
            </div>
        </div>
    );
};

export default Login;
