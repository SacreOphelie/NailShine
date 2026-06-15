"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

export function useAuth() {
    const [isConnected, setIsConnected] = useState(false);
    // Le temps de chargement
    const [loading, setLoading] = useState(true);
    // Profil de l'utilisateur
    const [userProfil, setUserProfil] = useState<any | null>(null);

    useEffect(() => {
        let isMounted = true;

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
                    return data;
                }

                return null;

            }catch(error){
                console.error("Erreur lors de la récupération du profil de l'utilisateur :", error);
                return null;
            }
        };

        const syncAuthState = async ({ showLoading = false } = {}) => {
            try{
                if (showLoading) {
                    setLoading(true);
                }

                const { data: { session } } = await supabase.auth.getSession();

                if (!isMounted) {
                    return;
                }

                setIsConnected(!!session);
                if(session?.user){
                    const profil = await getUserProfil(session.user.id);
                    if (isMounted) {
                        setUserProfil(profil);
                    }
                }else{
                    setUserProfil(null);
                }
            }catch(error){
                console.error("Erreur lors de l'initialisation de l'authentification :", error);
            }finally{
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        syncAuthState({ showLoading: true });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
           if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
                setIsConnected(!!session);
                if (session?.user) {
                    const profil = await getUserProfil(session.user.id);
                    if (isMounted) {
                        setUserProfil(profil);
                    }
                } else {
                    setUserProfil(null);
                }
                setLoading(false);
            }
        });

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                syncAuthState();
            }
        };

        window.addEventListener('focus', handleVisibilityChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            isMounted = false;
            subscription.unsubscribe();
            window.removeEventListener('focus', handleVisibilityChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const refreshAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        setIsConnected(!!session);
        if (session?.user) {
            const { data, error } = await supabase
                .from('clients')
                .select('nom,prenom,role')
                .eq('id', session.user.id)
                .maybeSingle();

            if (!error) {
                setUserProfil(data ?? null);
            }
        } else {
            setUserProfil(null);
        }

        setLoading(false);
    };

    return { isConnected, loading, userProfil, refreshAuth };
}