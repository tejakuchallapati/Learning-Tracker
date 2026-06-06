'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(40);
    const navigate = useNavigate();
	const compact = scrolled || open;

	const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };

    const scrollToWorkflow = () => {
        document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };

    const scrollToSignup = () => {
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };

	const links = [
		{ label: 'About us', onClick: scrollToAbout },
		{ label: 'Workflow', onClick: scrollToWorkflow },
		{ label: 'Sign In', onClick: () => { navigate('/login'); setOpen(false); } },
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'sticky z-50 mx-auto w-full px-4 sm:px-6 transition-all duration-500 ease-out',
				compact ? 'top-6 md:top-8 max-w-3xl' : 'top-10 md:top-12 max-w-5xl',
			)}
		>
			<nav
				className={cn(
					'flex w-full items-center justify-between rounded-full border transition-all duration-500 ease-out',
					'landing-nav-glass',
					compact
						? 'h-11 md:h-12 px-4 md:px-5'
						: 'h-16 md:h-[4.5rem] px-6 md:px-10',
				)}
			>
				<div
                    className="flex items-center group cursor-pointer shrink-0 transition-all duration-500"
                    style={{ gap: compact ? '0.5rem' : '0.75rem' }}
                    onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    <div
                        className={cn(
                            'landing-icon-chip rounded-lg flex items-center justify-center p-1 group-hover:scale-105 transition-all duration-500',
                            compact ? 'w-7 h-7' : 'w-11 h-11',
                        )}
                    >
                        <img src={logo} alt="LT" className="w-full h-full object-contain" />
                    </div>
                    <span
                        className={cn(
                            'landing-display text-slate-100 hidden sm:inline !tracking-tight transition-all duration-500',
                            compact ? 'text-sm' : 'text-base md:text-lg',
                        )}
                    >
                        Learning<span className="text-sky-400">Tracker</span>
                    </span>
                </div>

				<div
                    className={cn(
                        'hidden items-center md:flex transition-all duration-500',
                        compact ? 'gap-4' : 'gap-8',
                    )}
                >
					{links.map((link) => (
						<button
                            key={link.label}
                            type="button"
                            className={cn(
                                'landing-nav-label text-slate-400 hover:text-sky-300 transition-all duration-500',
                                compact ? 'text-[9px]' : 'text-[11px]',
                            )}
                            onClick={link.onClick}
                        >
							{link.label}
						</button>
					))}
					<button
                        type="button"
                        onClick={scrollToSignup}
                        className={cn(
                            'landing-cta landing-nav-label text-white rounded-full transition-all duration-500',
                            compact ? 'text-[9px] px-4 py-2' : 'text-[11px] px-6 py-3',
                        )}
                    >
                        Get started
                    </button>
				</div>

				<Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className={cn(
                        'md:hidden rounded-full border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 tap-target-icon transition-all duration-500',
                        compact ? 'h-9 w-9' : 'h-11 w-11',
                    )}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                >
					<MenuToggleIcon open={open} className={compact ? 'size-4' : 'size-5'} />
				</Button>
			</nav>

			<div
				className={cn(
					'landing-nav-glass fixed right-4 left-4 z-50 flex flex-col overflow-hidden rounded-2xl md:hidden transition-all duration-300',
					compact ? 'top-[4.75rem] md:top-[5.25rem]' : 'top-32',
					open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
				)}
			>
				<div className="flex flex-col gap-2 p-5">
					<button
                        type="button"
                        className="text-left py-3 landing-display text-lg text-slate-100 border-b border-white/10"
                        onClick={scrollToAbout}
                    >
						About us
					</button>
					<button
                        type="button"
                        className="text-left py-3 landing-display text-lg text-slate-100 border-b border-white/10"
                        onClick={scrollToWorkflow}
                    >
						Workflow
					</button>
					<button
                        type="button"
                        className="text-left py-3 landing-display text-lg text-slate-100 border-b border-white/10"
                        onClick={() => { navigate('/login'); setOpen(false); }}
                    >
						Sign In
					</button>
					<button
                        type="button"
                        className="landing-cta mt-3 py-4 rounded-full landing-nav-label text-xs text-white"
                        onClick={scrollToSignup}
                    >
						Get started free
					</button>
				</div>
			</div>
		</header>
	);
}
