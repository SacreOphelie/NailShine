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

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            try{
                setIsConnected(!!session);// Si session existe, l'utilisateur est connecté
                // Récupérer la session de l'utilisateur
                if(session?.user){
                    await getUserProfil(session.user.id);
                }else{
                    setUserProfil(null);
                }
            }catch (error) {
                console.error("Erreur lors de la vérification de l'état de connexion :", error);
            }finally{
                setLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { isConnected, loading, userProfil };
}