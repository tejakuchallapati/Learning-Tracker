import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ResponsiveGoogleLogin from '../components/ResponsiveGoogleLogin';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw]     = useState(false);
    const [error, setError]       = useState('');
    const [loading, setLoading]   = useState(false);

    const { user, login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    /* ── email/password login ──────────────────────────────── */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Incorrect email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /* ── Google OAuth ──────────────────────────────────────── */
    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        setLoading(true);
        try {
            if (!credentialResponse?.credential) {
                throw new Error('No Google credential received. Please try again.');
            }
            await googleLogin(credentialResponse.credential);
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Google sign-in failed. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError(
            'Google sign-in was blocked. Make sure pop-ups are allowed for this site, ' +
            'then try again.'
        );
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-violet-50/30 flex items-center justify-center px-4 py-8 sm:py-12 overflow-x-hidden">
            <div className="w-full max-w-md min-w-0">

                {/* ── Logo / brand ───────────────────────── */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600 shadow-xl shadow-violet-200 mb-4">
                        <span className="text-white text-2xl font-black">L</span>
                    </div>
                    <h1 className="text-fluid-xl font-black text-slate-900 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        Sign in to continue your learning journey
                    </p>
                </div>

                {/* ── Card ───────────────────────────────── */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-5 sm:p-8 space-y-5 w-full min-w-0">

                    {/* Error banner */}
                    {error && (
                        <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* ── Google Sign-In ── */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Sign in with Google
                        </p>
                        <ResponsiveGoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            size="large"
                            shape="rectangular"
                            theme="outline"
                            text="signin_with"
                            logo_alignment="left"
                        />
                    </div>

                    {/* ── Divider ── */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-100"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            or with email
                        </span>
                        <div className="flex-1 h-px bg-slate-100"></div>
                    </div>

                    {/* ── Email / Password form ── */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
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
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <input
                                    id="login-password"
                                    type={showPw ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full h-12 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(v => !v)}
                                    className="absolute inset-y-0 right-0 flex items-center justify-center tap-target-icon pr-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                                    aria-label={showPw ? 'Hide password' : 'Show password'}
                                >
                                    {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full min-h-12 h-12 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-fluid-sm rounded-xl shadow-lg shadow-violet-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 px-4 btn-text-safe"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                                    Signing in…
                                </>
                            ) : (
                                'Sign In →'
                            )}
                        </button>
                    </form>

                    {/* ── Sign-up link ── */}
                    <p className="text-center text-sm text-slate-500 font-medium pt-1">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-violet-600 hover:text-violet-700 font-bold underline underline-offset-2"
                        >
                            Create one free
                        </Link>
                    </p>
                </div>

                {/* ── Google notice (helps debugging) ── */}
                <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                    Google Sign-In requires pop-ups to be <span className="font-semibold">allowed</span> in your browser settings.
                </p>
            </div>
        </div>
    );
};

export default Login;
