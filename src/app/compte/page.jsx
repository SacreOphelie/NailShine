"use client";

import '@/styles/connexion.scss';
import {supabase} from "@/config/supabase";
import { useAuth } from '@/config/Auth';
import { TriangleAlert } from 'lucide-react';

export default function Compte(){
    const { userProfil, isConnected } = useAuth();

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
                    <h4><TriangleAlert size={25}/>Vous devez être connecté pour accéder à votre compte.</h4>
                </div>
            )}
        </div>
    );
}