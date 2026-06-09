import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

export function useAuth() {
    const [isConnected, setIsConnected] = useState(false);
    // Le temps de chargement
    const [loading, setLoading] = useState(true);

    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsConnected(!!session);
            setLoading(false);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setIsConnected(!!session);// Si session existe, l'utilisateur est connecté
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { isConnected, loading };
}