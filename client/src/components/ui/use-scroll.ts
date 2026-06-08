'use client';
import React from 'react';

export function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY || document.documentElement.scrollTop || 0;
			setScrolled(y > threshold);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [threshold]);

	return scrolled;
}
