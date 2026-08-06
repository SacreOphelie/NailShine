"use client";

/* eslint-disable @next/next/no-img-element */
import '@/styles/add-rea.scss';
import { useAuth } from '@/config/Auth';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {supabase} from '@/config/supabase';

export default function AddRea()  {
    const{userProfil, isConnected,loading} = useAuth();
    const router = useRouter();

    const [rdv, setRdv] = useState([]);
    // Gestion de la redirection si l'utilisateur n'est pas connecté ou n'est pas admin
    useEffect(() => {
        if(!loading){
            if(!isConnected || userProfil?.role !== 'admin'){
                router.replace('/');
            }
        }
    }, [loading, isConnected, userProfil?.role, router]);

    
    // Pouvoir choisir un rendez-vous passer pour avoir l'id de la cliente et la technique etc...
    useEffect(() => {
        const fetchRdv = async () => {
            try{
                const {data, error} = await supabase
                    .from('rendez_vous')
                    .select('*');
                if(error){
                    console.error('Erreur lors de la récupération des rendez-vous :', error);
                }else if(data){
                    setRdv(data);
                }
            }catch(error){
                console.error('Erreur lors de la récupération des rendez-vous :', error);
            }
        };
        fetchRdv();
    }, []);
    
    if (loading || !isConnected || userProfil?.role !== 'admin') {
        return (
            <div className="slide"></div>
        );
    }
    return(
        <div className="slide" id="add-rea">
            <div className="box">
                <h2>Ajouter une réalisation</h2>
            </div>
        </div>
    );
}