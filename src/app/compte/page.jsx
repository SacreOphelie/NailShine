"use client";

import '@/styles/connexion.scss';
import {supabase} from "@/config/supabase";
import { useAuth } from '@/config/Auth';

export default function Compte(){
    const { userProfil, isConnected,loading } = useAuth();

    if(loading) return <div className="slide" id="compte"><p>Chargement...</p></div>;

    return(
        <div className="slide" id="compte">
            {isConnected && userProfil ?(
                <div className="box-connexion">
                    <h2>Mon compte</h2>
                    <p>Bienvenue, {userProfil.prenom} {userProfil.nom}!</p>
                    {userProfil.role === 'admin' && <p>Rôle : Administrateur</p>}
                </div>
            ): (
                <div className="box-compte">
                    <h2>Vous devez être connecté pour accéder à votre compte.</h2>
                </div>
            )}
        </div>
    );
}