/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/rdv.scss';
import {useAuth} from "@/config/Auth";
import {supabase} from "@/config/supabase";
import Select from '@/components/Forms/Select';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';

export default function PrendreRdv() {
    const {isConnected, userProfil,loading} = useAuth();
    // Afficher les techniques disponibles
    const [techniques, setTechniques] = useState([]);
    // Récupérer le choix client
    const [techniqueId , setTechniqueId] = useState('');

    // Récupérer les techniques depuis la base de données
    useEffect(() => {
        const fetchTechniques = async () => {
            try{
                const {data, error} = await supabase
                    .from('techniques')
                    .select('*');

                if(error){
                    console.error("Erreur lors de la récupération des techniques :", error);
                }else if (data){
                    setTechniques(data);
                }
            }catch (error){
                console.error("Erreur système", error)
            }
        };

        fetchTechniques();
    });

    // Envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!techniqueId)
        {
            console.log("Veuillez sélectionner une technique.");
            return;
        }

        console.log("Technique sélectionnée :", techniqueId);
    }


    // Temps de chargement
    if (loading) {
        return (
            <div className="slide" id="prendre-rdv">
                <div className="box">
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }
    
    return(
            <div className="slide" id="prendre-rdv">
            {isConnected && userProfil ? (
                <div className="box">
                    <h2>Prendre rendez-vous</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="prestations">
                            <p>Choisissez la prestation que vous souhaitez.</p>
                            <Select nomSelect="prestation" options={techniques} value={techniqueId} onChange={(e) => setTechniqueId(e.target.value)} />
                        </div>
                        <div className="btn">
                            <Button text="Prendre rendez-vous"/>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="box">
                    <h4>Vous devez être connecté pour prendre rendez-vous.</h4>
                </div>
            )}
            </div>
    );
}