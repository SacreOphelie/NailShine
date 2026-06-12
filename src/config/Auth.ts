"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

export function useAuth() {
    const [isConnected, setIsConnected] = useState(false);
    // Le temps de chargement
    const [loading, setLoading] = useState(true);
    // Profil de l'utilisateur
    const [userProfil, setUserProfil] = useState<any | null>(null);

    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        // Récupérer le profil de l'utilisateur
        const getUserProfil = async (userId: string) => {
            try{
                const {data, error} = await supabase
                    .from('clients')
                    .select('nom,prenom,role')
                    .eq('id', userId)
                    .maybeSingle();
                if (error) throw error;
                if(data){
                    setUserProfil(data);
                }

            }catch(error){
                console.error("Erreur lors de la récupération du profil de l'utilisateur :", error);
            }
        };

        const initializeAuth = async () => {
            try{
                const { data: { session } } = await supabase.auth.getSession();
                setIsConnected(!!session);
                if(session?.user){
                    await getUserProfil(session.user.id);
                }else{
                    setUserProfil(null);
                }
            }catch(error){
                console.error("Erreur lors de l'initialisation de l'authentification :", error);
            }finally{
                setLoading(false);
            }
        }

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
           if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
                setIsConnected(!!session);
                if (session?.user) {
                    await getUserProfil(session.user.id);
                } else {
                    setUserProfil(null);
                }
                setLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { isConnected, loading, userProfil };
}