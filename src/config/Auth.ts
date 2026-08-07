"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

export function useAuth() {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userProfil, setUserProfil] = useState<any | null>(null);

    useEffect(() => {
        let isMounted = true;

        const getUserProfil = async (userId: string) => {
            // console.log("-> [3] DB REQUÊTE : Lancement du fetch profil pour ID:", userId);
            try {
                const { data, error } = await supabase
                    .from('clients')
                    .select('nom,prenom,role')
                    .eq('id', userId)
                    .maybeSingle();

                if (error) {
                    console.error("-> [4] DB ERREUR SQL :", error);
                    throw error;
                }

                // console.log("-> [4] DB RÉSULTAT :", data);
                if (data) {
                    return data;
                }

                return null;
            } catch (error) {
                console.error("-> [4] DB EXCEPTION : Erreur lors de la récupération :", error);
                return null;
            }
        };

        const syncAuthState = async ({ showLoading = false } = {}) => {
            // console.log("-> [2] SESSION : Lancement de syncAuthState...");
            try {
                if (showLoading) {
                    setLoading(true);
                }

                const { data: { session }, error } = await supabase.auth.getSession();
                // console.log("-> [2] SESSION RÉSULTAT : Session =", session ? "EXISTE" : "NULL", "| Erreur =", error);

                if (!isMounted) return;

                setIsConnected(!!session);
                if (session?.user) {
                    const profil = await getUserProfil(session.user.id);
                    // console.log("-> [5] SYNC UPDATE : Mise à jour userProfil avec =", profil);
                    if (isMounted) {
                        setUserProfil(profil);
                    }
                } else {
                    // console.warn("-> [5] SYNC UPDATE : Aucune session, passage du profil à NULL !");
                    setUserProfil(null);
                }
            } catch (error) {
                console.error("-> [2] EXCEPTION dans syncAuthState :", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        syncAuthState({ showLoading: true });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            // console.log("-> [EVENT SUPABASE] Événement détecté :", event, "| Session =", session ? "OK" : "NULL");

            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
                setIsConnected(!!session);
                if (session?.user) {
                    const profil = await getUserProfil(session.user.id);
                    if (isMounted && profil) {
                        setUserProfil(profil);
                    }
                } else {
                    // console.warn("-> [EVENT SUPABASE] Session vide après event -> passage du profil à NULL !");
                    setUserProfil(null);
                }
                setLoading(false);
            }
        });

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // console.log("-> [1] VISIBILITÉ : Retour sur l'onglet Chrome ! Déclenchement de syncAuthState...");
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