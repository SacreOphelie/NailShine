"use client";

import '@/styles/compte.scss';
import { useAuth } from '@/config/Auth';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import { supabase } from '@/config/supabase';

import CompteClient from '@/components/Compte/CompteClient';
import CompteAdmin from '@/components/Compte/CompteAdmin';

export default function Compte(){
    const { userProfil, isConnected, loading, refreshAuth } = useAuth();
    const router = useRouter();

    // Gestion de la redirection si l'utilisateur n'est pas connecté
    useEffect(() => {
        if(!loading && !isConnected) {
            router.replace('/se-connecter');
        }
    }, [loading, isConnected, router]);

    // Temps de chargement
    if (loading) {
        return (
            <div className="slide">Chargement en cours...</div>
        );
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/se-connecter');
        router.refresh();
    };

    // Ne pas aller plus loin si l'utilisateur n'est pas connecté
    if (!isConnected) {
        return(<div className="slide"> Veuillez vous connecter pour accéder à votre compte.</div>)
    }

    if(userProfil.role === 'admin'){
        return(
            <CompteAdmin />
        )
    }
    const rendezVousStatic = [
        { id: 1, date: '2026-05-26', heure: '10h', prestation: 'Acrylique + Nail art', prix: 50 },
        { id: 2, date: '2026-05-26', heure: '10h', prestation: 'Acrylique + Nail art', prix: 50 },
        { id: 3, date: '2025-08-30', heure: '14h', prestation: 'Pose gel', prix: 40 },
    ];

    return(
        <CompteClient rendezVous={userProfil.rendezVous || rendezVousStatic} />
    );
}