'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Qui-suis-je ?', href: '/qui-suis-je' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Compte', href: '/se-connecter' },
]

export default function Nav(){
    return(
        <>
        <nav>
            <Logo />
            <div className="nav-links">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="nav-link">
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
        </>
    )
}