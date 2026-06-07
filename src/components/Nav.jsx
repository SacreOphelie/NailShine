'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { navItems } from '@/config/navigation';
import '@/styles/nav.scss';

export default function Nav(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Ferme le menu si la fenêtre est redimensionnée au-delà de 1500px
    useEffect(() => {
        const closeMenuOnDesktop = () => {
            if (window.innerWidth > 1500) {
                setIsMenuOpen(false);
            }
        };

        closeMenuOnDesktop();
        window.addEventListener('resize', closeMenuOnDesktop);

        return () => window.removeEventListener('resize', closeMenuOnDesktop);
    }, []);

    return(
        <>
        <nav>
            <div className="nav-container">
                <Logo onClick={() => setIsMenuOpen(false)} />
                <div className="nav-links">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="nav-link">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className={`nav-burger${isMenuOpen ? ' is-open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`container-menu${isMenuOpen ? ' is-open' : ''}`}>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
        </>
    )
}