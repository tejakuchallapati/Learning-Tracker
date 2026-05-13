'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
    const navigate = useNavigate();

	const links = [
		{
			label: 'Vision',
			href: '#',
            onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		{
			label: 'Blueprint',
			href: '#features',
            onClick: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
		},
		{
			label: 'Terminal',
			href: '/login',
            onClick: () => navigate('/login')
		},
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
				'sticky top-0 z-50 mx-auto w-full max-w-7xl border-b border-transparent md:transition-all md:ease-out',
				{
					'bg-white/80 dark:bg-slate-950/80 supports-[backdrop-filter]:bg-background/50 border-slate-200 dark:border-slate-800 backdrop-blur-lg md:top-8 md:max-w-5xl md:rounded-2xl md:border md:shadow-2xl':
						scrolled && !open,
					'bg-white dark:bg-slate-950': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-20 w-full items-center justify-between px-6 md:h-16 md:transition-all md:ease-out',
					{
						'md:px-8': scrolled,
					},
				)}
			>
				<div 
                    className="flex items-center gap-3 group cursor-pointer" 
                    onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-xl border border-slate-100 dark:border-slate-800 p-1.5 group-hover:scale-105 transition-transform">
                        <img src={logo} alt="LT" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase hidden sm:block">Learning<span className="text-violet-600">Tracker</span></span>
                </div>

				<div className="hidden items-center gap-6 md:flex">
					{links.map((link, i) => (
						<button 
                            key={i} 
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-violet-600 transition-colors"
                            onClick={link.onClick}
                        >
							{link.label}
						</button>
					))}
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
					<Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em]" onClick={() => navigate('/login')}>Sign In</Button>
					<Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-violet-500/20" onClick={() => navigate('/login')}>Join Now</Button>
				</div>
				<Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden rounded-xl border-slate-200 dark:border-slate-800">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl fixed top-20 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-slate-100 dark:border-slate-800 md:hidden transition-all duration-300',
					open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
				)}
			>
				<div
					className={cn(
						'flex h-full w-full flex-col justify-between gap-y-4 p-8',
					)}
				>
					<div className="grid gap-y-4">
						{links.map((link) => (
							<button
								key={link.label}
								className="text-left py-4 text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-900/50"
								onClick={() => { link.onClick(); setOpen(false); }}
							>
								{link.label}
							</button>
						))}
					</div>
					<div className="flex flex-col gap-4 mt-auto">
						<Button variant="outline" className="w-full py-8 rounded-2xl border-slate-200 dark:border-slate-800 font-black uppercase tracking-widest text-xs" onClick={() => navigate('/login')}>
							Sign In to Terminal
						</Button>
						<Button className="w-full py-8 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-violet-500/20" onClick={() => navigate('/login')}>
							Join Learning Tracker
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
