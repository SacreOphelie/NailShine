'use client';

import Link from 'next/link';
import Image from 'next/image';
import { logoImage } from '@/config/assets';

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
            <Image src={logoImage} alt="Logo NailShine" width={100} height={70} className="nav-logo" />
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