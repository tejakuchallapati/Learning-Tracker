import { useState, useRef, useEffect, useContext, ChangeEvent, FormEvent, ReactNode } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
} from '@/components/ui/modern-animated-sign-in';

type FormData = {
  email: string;
  password: string;
};

interface LoginDemoProps {
    onSubmit: (email: string, password: string) => void;
    onGoogleSuccess: (credentialResponse: any) => void;
    onGoogleError: () => void;
    error: string;
    googleComponent: ReactNode;
}

export function LoginDemo({ onSubmit, googleComponent, error }: LoginDemoProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [darkMode, setDarkMode] = useState(false); // Default to light

  useEffect(() => {
    // Check local storage for theme preference, default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const goToForgotPassword = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.preventDefault();
    console.log('forgot password');
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: keyof FormData
  ) => {
    const value = event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData.email, formData.password);
  };

  const formFields = {
    header: 'Welcome back',
    subHeader: 'Sign in to your account',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email' as const,
        placeholder: 'Enter your email address',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password' as const,
        placeholder: 'Enter your password',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
    ],
    submitButton: 'Sign in',
    textVariantButton: 'Forgot password?',
    googleLogin: googleComponent
  };

  return (
    <section className='flex max-lg:justify-center overflow-hidden relative bg-white dark:bg-slate-950 transition-colors duration-500'>
      {/* Left Side - Vision Panel */}
      <div className='w-1/2 max-lg:hidden relative flex flex-col justify-center items-center p-20 border-r border-slate-100 dark:border-slate-900'>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
        
        <div className="max-w-md space-y-12 relative z-10">
          <div className="space-y-4">
             <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
               Learning<span className="text-violet-600 dark:text-violet-400">Tracker</span>
             </h1>
             <div className="h-1.5 w-12 bg-violet-600 rounded-full"></div>
          </div>

          <blockquote className="text-3xl font-black text-slate-800 dark:text-white leading-tight tracking-tight italic">
            “Learning Tracker is more than a productivity platform — it’s a <span className="text-violet-600 dark:text-violet-400">growth-driven ecosystem</span> designed to help students build consistency, track meaningful progress, and transform daily learning into long-term success.”
          </blockquote>

          <div className="grid grid-cols-1 gap-8 pt-8 border-t border-slate-100 dark:border-slate-900">
            {[
              { label: 'Consistency', desc: 'Build lasting habits with smart reminders.', icon: '🎯' },
              { label: 'Progress', desc: 'Visualize your journey with expert roadmaps.', icon: '📈' },
              { label: 'Success', desc: 'Accelerate your transition to mastery.', icon: '🏆' }
            ].map((pillar, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{pillar.icon}</div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">{pillar.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <span className='w-1/2 h-[100dvh] flex flex-col justify-center items-center max-lg:w-full max-lg:px-[10%]'>
        <AuthTabs
          formFields={formFields}
          goTo={goToForgotPassword}
          handleSubmit={handleSubmit}
          errorField={error}
        />
      </span>
    </section>
  );
}
