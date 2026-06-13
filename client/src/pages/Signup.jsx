import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SignupForm from '../components/auth/SignupForm';
import Logo from '../components/brand/Logo';
import { getHomePath } from '../utils/authSession';

const Signup = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate(getHomePath(user), { replace: true });
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/40 flex items-center justify-center px-4 py-12 max-md:min-h-[100dvh] max-md:py-8 overflow-x-hidden">
            <div className="w-full max-w-md min-w-0">
                <div className="text-center mb-8">
                    <Logo className="w-14 h-14 mb-4 shadow-xl shadow-sky-200/80 rounded-2xl mx-auto" />
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Create your account
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        New here? Sign up free — you&apos;ll go straight to your dashboard.
                    </p>
                </div>

                <SignupForm />
            </div>
        </div>
    );
};

export default Signup;
