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

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const iconsArray: OrbitIcon[] = [
  // Inner Ring (Radius 100 - 5 icons)
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
        alt='HTML5'
      />
    ),
    className: 'size-[35px] border-none bg-transparent',
    duration: 20,
    delay: 0,
    radius: 100,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
        alt='CSS3'
      />
    ),
    className: 'size-[35px] border-none bg-transparent',
    duration: 20,
    delay: 4,
    radius: 100,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
        alt='TailwindCSS'
      />
    ),
    className: 'size-[35px] border-none bg-transparent',
    duration: 20,
    delay: 8,
    radius: 100,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
        alt='TypeScript'
      />
    ),
    className: 'size-[35px] border-none bg-transparent',
    duration: 20,
    delay: 12,
    radius: 100,
    path: true,
    reverse: false,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
        alt='JavaScript'
      />
    ),
    className: 'size-[35px] border-none bg-transparent',
    duration: 20,
    delay: 16,
    radius: 100,
    path: true,
    reverse: false,
  },

  // Outer Ring (Radius 210 - 5 icons)
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
        alt='Figma'
      />
    ),
    className: 'size-[45px] border-none bg-transparent',
    duration: 30,
    delay: 0,
    radius: 210,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
        alt='React'
      />
    ),
    className: 'size-[45px] border-none bg-transparent',
    duration: 30,
    delay: 6,
    radius: 210,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
        alt='Git'
      />
    ),
    className: 'size-[45px] border-none bg-transparent',
    duration: 30,
    delay: 12,
    radius: 210,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
        alt='Node.js'
      />
    ),
    className: 'size-[45px] border-none bg-transparent',
    duration: 30,
    delay: 18,
    radius: 210,
    path: true,
    reverse: true,
  },
  {
    component: () => (
      <img
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
        alt='Nextjs'
      />
    ),
    className: 'size-[45px] border-none bg-transparent',
    duration: 30,
    delay: 24,
    radius: 210,
    path: true,
    reverse: true,
  },
];

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

  const [darkMode, setDarkMode] = useState(true); // Default to dark

  useEffect(() => {
    // Force dark mode for login screen
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
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
    <section className='flex max-lg:justify-center overflow-hidden relative bg-black'>
      {/* Left Side */}
      <span className='flex flex-col justify-center w-1/2 max-lg:hidden relative'>
        <TechOrbitDisplay iconsArray={iconsArray} text="Learning Tracker" />
      </span>

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
