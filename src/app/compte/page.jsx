"use client";

import '@/styles/connexion.scss';
import { useAuth } from '@/config/Auth';
import { TriangleAlert } from 'lucide-react';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Compte(){
    const { userProfil, isConnected, loading } = useAuth();
    const router = useRouter();

    // Gestion de la redirection si l'utilisateur n'est pas connecté
    useEffect(() => {
        if(!loading && !isConnected) {
            router.push('/se-connecter');
        }
    }, [loading, isConnected, router]);

    // Temps de chargement
    if (loading) {
        return (
            <div className="slide"></div>
        );
    }

    // Ne pas aller plus loin si l'utilisateur n'est pas connecté
    if (!isConnected || !userProfil) {
        return null; 
    }

    return(
        <div className="slide" id="compte">
            <div className="box-connexion">
                <h2>Mon compte</h2>
                <p>Bienvenue, {userProfil.prenom} {userProfil.nom}!</p>
                {userProfil.role === 'admin' && <p>Rôle : Administrateur</p>}
            </div>
        </div>
    );
}