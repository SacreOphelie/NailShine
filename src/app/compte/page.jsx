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
            <div className="slide " id="admin">
            <Button url="/ajouter-une-realisation" text="Ajouter une réalisation"className="btn-add"/>
            <div className="box-compte wrapper">
                <h2>Mon compte</h2>
                <p>Rôle : Administrateur</p>
            </div>
        </div>
        )
    }

    return(
        <div className="slide " id="compte">
            <div className="box-compte wrapper">
                <h2>Mon compte</h2>
                <p>Bienvenue, {userProfil.prenom} {userProfil.nom}!</p>
            </div>
        </div>
    );
}