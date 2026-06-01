'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import '@/styles/nav.scss';

const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Qui-suis-je ?', href: '/qui-suis-je' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Compte', href: '/se-connecter' },
]

export default function Nav(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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