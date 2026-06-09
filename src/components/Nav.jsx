/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { navItems } from '@/config/navigation';
import '@/styles/nav.scss';
import { supabase } from '@/config/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/config/Auth';
import { toast } from 'react-toastify';

export default function Nav(){
    const router = useRouter();
    const { isConnected, loading } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Déconnexion
    const handleLogout = async () => {
        await supabase.auth.signOut();

        // notification de toastify
        localStorage.removeItem('token'); 
        toast.success('Déconnexion réussie.', {
        
        });
        router.push('/');
        router.refresh();
    };

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
                    {isConnected ? (
                        <>
                        <div className="compte">
                            <Link href="/compte" className="nav-link">
                                Compte
                            </Link>
                            <div className="sous-menu">
                                <Link href="/mes-rendez-vous" className="nav-link">
                                    Mes rendez-vous
                                </Link>
                                <div onClick={handleLogout} className="nav-link deco">
                                    Se déconnecter
                                </div>
                            </div>
                        </div>
                            <Link href="/favoris" className="nav-link favoris">
                                <img src="/icones/Icon_heart.png" alt="Favoris" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/se-connecter" className="nav-link compte">
                                Compte
                            </Link>
                        </>
                    )}
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