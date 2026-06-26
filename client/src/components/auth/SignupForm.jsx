import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ResponsiveGoogleLogin from './ResponsiveGoogleLogin';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { formatApiError } from '../../utils/apiErrors';
import { warmApi } from '../../utils/warmApi';
import { getHomePath } from '../../utils/authSession';
import { prefetchDashboard } from '../../utils/prefetchDashboard';

const SignupForm = ({ embedded = false }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        warmApi();
    }, []);

    const accentRing = 'focus:ring-sky-500/15 focus:border-sky-500';
    const accentBtn = 'bg-sky-600 hover:bg-sky-700 shadow-sky-200 dark:shadow-none disabled:opacity-60 disabled:cursor-not-allowed';
    const accentLink = 'text-sky-600 hover:text-sky-800 dark:hover:text-sky-400';
    const accentIcon = 'hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30';

    const goToApp = (session) => {
        if (!session?.isAdmin) prefetchDashboard();
        navigate(getHomePath(session), { replace: true });
    };

    const handleGoogleSuccess = async (googleResponse) => {
        setError('');
        const { code, redirectUri, credential } = googleResponse || {};
        if (!code && !credential) {
            setError('Google did not return a sign-in token. Please try again.');
            return;
        }
        setGoogleLoading(true);
        try {
            const session = await googleLogin({ code, redirectUri, credential });
            goToApp(session);
        } catch (err) {
            setError(formatApiError(err, 'Google sign up failed. Please try again.'));
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError(
            'Google sign-up was blocked. Allow pop-ups for this site, then try again.'
        );
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setSubmitting(true);
        try {
            const session = await register(formData.name, formData.email, formData.password);
            goToApp(session);
        } catch (err) {
            setError(formatApiError(err, 'Failed to sign up. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = `block w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold text-slate-900 focus:ring-4 outline-none transition-all placeholder:text-slate-400 ${accentRing}`;
    const labelClass = embedded
        ? 'block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 landing-nav-label'
        : 'block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1';

    return (
        <div className={embedded ? '' : 'bg-white dark:bg-slate-900 py-8 px-6 sm:py-10 sm:px-12 shadow-3xl border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-[2rem] transition-all'}>
            {error && (
                <div className="flex items-start gap-3 p-4 mb-5 bg-rose-50 text-rose-700 rounded-xl text-sm font-medium border border-rose-100">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                    <label className={labelClass}>Full name</label>
                    <input type="text" name="name" required placeholder="Full Name" className={inputClass} onChange={handleChange} />
                </div>

                <div className="space-y-1.5">
                    <label className={labelClass}>Email address</label>
                    <input type="email" name="email" required autoComplete="email" placeholder="Email Address" className={inputClass} onChange={handleChange} />
                </div>

                <div className="space-y-1.5">
                    <label className={labelClass}>Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required
                            minLength={6}
                            autoComplete="new-password"
                            placeholder="Create password (min. 6 characters)"
                            className={`${inputClass} pr-12`}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 right-0 tap-target-icon pr-2 flex items-center justify-center text-slate-400 rounded-lg transition-colors ${accentIcon}`}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className={labelClass}>Confirm password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            required
                            minLength={6}
                            autoComplete="new-password"
                            placeholder="Repeat password"
                            className={`${inputClass} pr-12`}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute inset-y-0 right-0 tap-target-icon pr-2 flex items-center justify-center text-slate-400 rounded-lg transition-colors ${accentIcon}`}
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting || googleLoading}
                    className={`w-full h-12 flex items-center justify-center gap-2 text-white rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider shadow-xl transition-all active:scale-[0.98] ${accentBtn}`}
                >
                    {submitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Creating account…
                        </>
                    ) : (
                        'Sign up free →'
                    )}
                </button>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100" />
                    </div>
                    <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
                        <span className={`px-3 ${embedded ? 'bg-white' : 'bg-white dark:bg-slate-900'} text-slate-400`}>
                            Or sign up with
                        </span>
                    </div>
                </div>

                <div className="mt-6 w-full min-w-0">
                    {googleLoading ? (
                        <div className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-500">
                            <span className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                            Signing up with Google…
                        </div>
                    ) : (
                        <ResponsiveGoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            text="signup_with"
                            disabled={googleLoading}
                        />
                    )}
                </div>
            </div>

            <p className="mt-8 text-center text-xs font-semibold text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className={`${accentLink} underline underline-offset-4`}>
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default SignupForm;
