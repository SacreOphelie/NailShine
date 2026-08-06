"use client";

import '@/styles/compte.scss';
import { useAuth } from '@/config/Auth';
import { TriangleAlert } from 'lucide-react';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import { supabase } from '@/config/supabase';
import Button from '@/components/Button';

export default function Compte(){
    const { userProfil, isConnected, loading, refreshAuth } = useAuth();
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/se-connecter');
        router.refresh();
    };

    // Ne pas aller plus loin si l'utilisateur n'est pas connecté
    if (!isConnected) {
        return(<div className="slide"></div>)
    }

    if (!userProfil) {
        return (
            <div className="slide" id="compte">
                <div className="box-compte">
                    <h2>Mon compte</h2>
                    <p>Votre profil est temporairement indisponible. Vous pouvez réessayer ou vous déconnecter.</p>
                    <div className="btn">
                        <button type="button" onClick={refreshAuth}>Réessayer</button>
                        <button type="button" onClick={handleLogout}>Se déconnecter</button>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="slide " id="admin">
            <Button url="/ajouter-une-realisation" text="Ajouter une réalisation"className="btn-add"/>
            <div className="box-compte wrapper">
                <h2>Mon compte</h2>
                <p>Bienvenue, {userProfil.prenom} {userProfil.nom}!</p>
                {userProfil.role === 'admin' && <p>Rôle : Administrateur</p>}
            </div>
        </div>
    );
}