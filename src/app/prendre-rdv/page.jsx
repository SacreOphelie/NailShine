/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/rdv.scss';
import {useAuth} from "@/config/Auth";
import {supabase} from "@/config/supabase";
import Select from '@/components/Forms/Select';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { TriangleAlert } from 'lucide-react';

export default function PrendreRdv() {
    const {isConnected, userProfil,loading} = useAuth();
    // Afficher les techniques disponibles
    const [techniques, setTechniques] = useState([]);
    // Récupérer le choix client
    const [techniqueId , setTechniqueId] = useState('');
    // Gérer la case Nail art
    const [nailArt, setNailArt] = useState(false);

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
    },[]);

    // Gestion des erreurs
    const [erreur, setErreur] = useState({});

    // Envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        setErreur({});

        const erreurs = {};

        if(!techniqueId)
        {
            erreurs.techniqueId = "Veuillez sélectionner une technique.";
            console.log("Veuillez sélectionner une technique.");
        }

        //Si l'objet contient au moins une erreur, on affiche tout et on stoppe l'envoi
        if (Object.keys(erreurs).length > 0) {
            setErreur(erreurs);
            return;
        }

        console.log("Technique sélectionnée :", techniqueId);
        console.log("Nail art :", nailArt);
    }

    // Temps de chargement
    if (loading) {
        return (
            <div className="slide"></div>
        );
    }

    // enlever la technique dont le bool nail_art est à true du select
    const techniquesPrincipales = techniques.filter(technique => !technique.nail_art);
    // récupérer la technique dont le bool nail_art est à true
    const nailArtTechnique = techniques.find(technique => technique.nail_art === true);

    // Calculer le prix de la prestation choisie
    let prixTotal = 0;

    // Récupérer le prix de la technique choisie
    if(techniqueId){
        const techniqueChoisie = techniquesPrincipales.find(technique => technique.id.toString() === techniqueId.toString());
        if(techniqueChoisie){
            prixTotal += techniqueChoisie.prix;
        }
    }

    // On ajoute le prix du nail art si la case est cochée
    if(nailArt && nailArtTechnique){
        prixTotal += nailArtTechnique.prix;
    }
    
    return(
        <div className="slide" id="prendre-rdv">
        {isConnected && userProfil ? (
            <div className="box">
                <h2>Prendre rendez-vous</h2>
                <form onSubmit={handleSubmit}>
                    <div className="prestations">
                        <p className="subtitle"></p>
                        <div className="nail-art">
                            <Input label="Nail art" type="checkbox" value={nailArt} onChange={(e) => setNailArt(e.target.checked)} className="checkbox"/>
                        </div>
                        <div className="container-presta">
                            <Select nomSelect="prestation" options={techniquesPrincipales} value={techniqueId} onChange={(e) => setTechniqueId(e.target.value)} placeholder="Choisissez la prestation que vous souhaitez." error={!!erreur.techniqueId}/>
                            <div className="prix">
                                {techniqueId ?(
                                    <p>{prixTotal} €</p>
                                ) : (
                                    <p>Prix €</p>
                                )}
                            </div>
                        </div>
                        {erreur.techniqueId && <div className="error-message"><TriangleAlert size={20}/>{erreur.techniqueId}</div>}
                    </div>
                    <div className="btn">
                        <Button text="Confirmer"/>
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