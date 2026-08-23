"use client";

import '@/styles/compte.scss';
import { useAuth } from '@/config/Auth';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabase';
import { toast } from 'react-toastify';

import CompteClient from '@/components/Compte/CompteClient';
import CompteAdmin from '@/components/Compte/CompteAdmin';

export default function Compte(){
    const { userProfil, isConnected, loading } = useAuth();
    const router = useRouter();

    const [rendezVous, setRendezVous] = useState([]);
    const [nailArt, setNailArt] = useState(0);

    const [realisations, setRealisations] = useState([]);

   // Récupération des réalisations (admin)
    const fetchRealisations = useCallback(async () => {
        const { data, error } = await supabase
            .from('realisations')
            .select('*');

        if (error) {
            console.error("Erreur lors de la récupération des réalisations :", error);
        } else {
            setRealisations(data);
        }
    }, []);

    useEffect(() => {
        if (isConnected && userProfil?.role === 'admin') {
            fetchRealisations();
        }
    }, [isConnected, userProfil, fetchRealisations]);

    // Gestion de la redirection si l'utilisateur n'est pas connecté
    useEffect(() => {
        if(!loading && !isConnected) {
            router.replace('/se-connecter');
        }
    }, [loading, isConnected, router]);

    // Récupération des rendez-vous de l'utilisateur connecté
    const fetchRendezVous = useCallback(async () => {
        if (!userProfil?.id) return;
        const { data, error } = await supabase
            .from('rendez_vous')
            .select('*,techniques(nom,prix)')
            .eq('client_id', userProfil.id);

        if (error) {
            console.error('Erreur récupération rendez-vous :', error);
        } else {
            setRendezVous(data);
        }
        // Récupérer le prix du nail art
        const {data:nailArtData, error:nailArtError} = await supabase
            .from('techniques')
            .select('prix')
            .eq('nail_art', true)
            .maybeSingle();
        if(!nailArtError && nailArtData){
            setNailArt(nailArtData.prix);
        }
    }, [userProfil?.id]);

    useEffect(() => {
        if (isConnected && userProfil?.role !== 'admin') {
            fetchRendezVous();
        }
    }, [isConnected, userProfil, fetchRendezVous]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/se-connecter');
        router.refresh();
    };

    const handleAnnuler = async (rdvId) => {
        const { error } = await supabase
            .from('rendez_vous')
            .delete()
            .eq('id', rdvId);

        if (error) {
            console.error('Erreur lors de l\'annulation :', error);
            return;
        }
        // Mise à jour locale : on retire le rdv annulé sans refaire un fetch complet
        setRendezVous(prev => prev.filter(item => item.id !== rdvId));
        toast('Rendez-vous annulé.', {
            className: 'toast-success',
            progressClassName: 'toast-progress-bar',
        });
    };

    const handleSupprimer = async (reaId) => {
        const { error } = await supabase
            .from('realisations')
            .delete()
            .eq('id', reaId);

        if (error) {
            console.error('Erreur lors de la suppression :', error);
            return;
        }
        // Mise à jour locale : on retire la réalisation supprimée sans refaire un fetch complet
        setRealisations(prev => prev.filter(item => item.id !== reaId));
        toast('Réalisation supprimée.', {
            className: 'toast-success',
            progressClassName: 'toast-progress-bar',
        });
    };

    // Temps de chargement
    if (loading) {
        return (
            <div className="slide"></div>
        );
    }

    // Ne pas aller plus loin si l'utilisateur n'est pas connecté
    if (!isConnected) {
        return(<div className="slide"> Veuillez vous connecter pour accéder à votre compte.</div>)
    }

    if(userProfil.role === 'admin'){
        return(
            <>
                <CompteAdmin realisations={realisations} onSupprimer={handleSupprimer}/>
            </>
        )
    }
    console.log("ID utilisateur:", userProfil.id);

    return(
        <>
            <CompteClient rendezVous={rendezVous} nailArt={nailArt} onAnnuler={handleAnnuler}/>
        </>
    );
}