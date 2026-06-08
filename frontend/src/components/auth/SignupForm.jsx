import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ResponsiveGoogleLogin from './ResponsiveGoogleLogin';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm = ({ embedded = false }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const accentRing = embedded ? 'focus:ring-blue-500/15 focus:border-blue-500' : 'focus:ring-violet-500/10 focus:border-violet-500';
    const accentBtn = embedded
        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
        : 'bg-violet-600 hover:bg-violet-700 shadow-violet-200 dark:shadow-none';
    const accentLink = embedded ? 'text-blue-600 hover:text-blue-800' : 'text-violet-600 hover:text-violet-700';
    const accentIcon = embedded ? 'hover:text-blue-600 hover:bg-blue-50' : 'hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30';

    const handleGoogleSuccess = async (credentialResponse) => {
        setError('');
        if (!credentialResponse?.credential) {
            setError('Google did not return a sign-in token. Please try again.');
            return;
        }
        setGoogleLoading(true);
        try {
            await googleLogin(credentialResponse.credential);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Google sign up failed. Please try again.');
        } finally {
            setGoogleLoading(false);
        }
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

    const inputClass = `block w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-semibold text-slate-900 focus:ring-4 outline-none transition-all placeholder:text-slate-400 ${accentRing}`;
    const labelClass = embedded
        ? 'block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 landing-nav-label'
        : 'block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1';

    return (
        <div className={embedded ? '' : 'bg-white dark:bg-slate-900 py-8 px-6 sm:py-10 sm:px-12 shadow-3xl border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-[2rem] transition-all'}>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100">
                        {error}
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className={labelClass}>Full name</label>
                    <input type="text" name="name" required placeholder="Full Name" className={inputClass} onChange={handleChange} />
                </div>

                <div className="space-y-1.5">
                    <label className={labelClass}>Email address</label>
                    <input type="email" name="email" required placeholder="Email Address" className={inputClass} onChange={handleChange} />
                </div>

                <div className="space-y-1.5">
                    <label className={labelClass}>Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required
                            placeholder="Create password"
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
                    className={`w-full h-12 flex items-center justify-center text-white rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider shadow-xl transition-all active:scale-[0.98] ${accentBtn}`}
                >
                    Create free account
                </button>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100" />
                    </div>
                    <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
                        <span className="px-3 bg-white text-slate-400">Or continue with</span>
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
                            onError={() => setError('Google sign up was unsuccessful')}
                            size="large"
                            shape="rectangular"
                            theme="outline"
                            text="signup_with"
                            logo_alignment="left"
                        />
                    )}
                </div>
            </div>

            <p className="mt-8 text-center text-xs font-semibold text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className={`${accentLink} underline underline-offset-4`}>
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignupForm;
