import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';

const Signup = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/dashboard');
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 max-md:min-h-[100dvh] max-md:py-8 overflow-x-hidden">
            <div className="sm:mx-auto sm:w-full sm:max-w-md min-w-0">
                <h2 className="mt-6 text-center text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Join the Elite</h2>
                <p className="mt-2 text-center text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Initialize your mastery protocol</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <SignupForm />
            </div>
        </div>
    );
};

export default Signup;
