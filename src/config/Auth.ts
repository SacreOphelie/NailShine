"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

export function useAuth() {
    const [isConnected, setIsConnected] = useState(false);
    // Le temps de chargement
    const [loading, setLoading] = useState(true);
    // Profil de l'utilisateur
    const [userProfil, setUserProfil] = useState(null);

    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        // Récupérer le profil de l'utilisateur
        const getUserProfil = async (userId) => {
            const {data, error} = await supabase
                .from('clients')
                .select('nom,prenom,role')
                .eq('id', userId)
                .maybeSingle();
            if(data){
                setUserProfil(data);
            }
        };

        // Vérifier la session de l'utilisateur
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsConnected(!!session);
            // Si une session existe récupérer le profil de l'utilisateur
            if(session?.user){
                await getUserProfil(session.user.id);
            }else{
                setUserProfil(null);
            }
            setLoading(false);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setIsConnected(!!session);// Si session existe, l'utilisateur est connecté
            // Récupérer la session de l'utilisateur
            if(session?.user){
                await getUserProfil(session.user.id);
            }else{
                setUserProfil(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { isConnected, loading, userProfil };
}