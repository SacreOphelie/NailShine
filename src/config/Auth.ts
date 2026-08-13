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
            console.log("-> [3] DB REQUÊTE : Lancement du fetch profil pour ID:", userId);
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

                console.log("-> [4] DB RÉSULTAT :", data);
                return data ?? null;
            } catch (error) {
                console.error("-> [4] DB EXCEPTION : Erreur lors de la récupération :", error);
                return null;
            }
        };

        // Chargement initial de la session (ceci n'est PAS dans onAuthStateChange, donc safe)
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!isMounted) return;

                setIsConnected(!!session);
                if (session?.user) {
                    const profil = await getUserProfil(session.user.id);
                    if (isMounted) setUserProfil(profil);
                } else {
                    setUserProfil(null);
                }
            } catch (error) {
                console.error("-> INIT EXCEPTION :", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("-> [EVENT SUPABASE] Événement détecté :", event, "| Session =", session ? "OK" : "NULL");

            setTimeout(async () => {
                if (!isMounted) return;

                setIsConnected(!!session);

                if (session?.user) {
                    const profil = await getUserProfil(session.user.id);
                    if (isMounted) setUserProfil(profil);
                } else {
                    setUserProfil(null);
                }

                if (isMounted) setLoading(false);
            }, 0);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
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