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

const Days = [
    { name: "Lundi", date: "2026-01-01" },
    { name: "Mardi", date: "2026-01-02" },
    { name: "Mercredi", date: "2026-01-03" },
    { name: "Jeudi", date: "2026-01-04" },
    { name: "Vendredi", date: "2026-01-05" },
    { name: "Samedi", date: "2026-01-06" }
];

const Hours = [
    { day: "Lundi", hour: ["10h", "14h", "16h"] },
    { day: "Mardi", hour: ["10h", "16h"] },
    { day: "Mercredi", hour: ["10h"] },
    { day: "Jeudi", hour: ["14h", "16h"] },
    { day: "Vendredi", hour: ["10h"] },
    { day: "Samedi", hour: [] }
];

export default function PrendreRdv() {
    const {isConnected, userProfil,loading} = useAuth();
    // Afficher les techniques disponibles
    const [techniques, setTechniques] = useState([]);
    // Récupérer le choix client
    const [techniqueId , setTechniqueId] = useState('');
    // Gérer la case Nail art
    const [nailArt, setNailArt] = useState(false);

    // les const pour le calendrier
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    // le texte de la prise du rendez-vous
    const [confirmationMessage, setConfirmationMessage] = useState('');

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

    // Logique de la sélection du jour et de l'heure
    const handleTime = (day, hour) => {
        setSelectedDay(day);
        setSelectedHour(hour);

        // Le message de confirmation se met à jour 
        const confirmationText = `Vous avez pris rendez-vous pour le ${day.name} ${day.date} à ${hour}.`;
        setConfirmationMessage(confirmationText);
    };

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

        if(!selectedDay || !selectedHour)
        {
            erreurs.date = "Veuillez sélectionner un jour et une heure.";
        }

        //Si l'objet contient au moins une erreur, on affiche tout et on stoppe l'envoi
        if (Object.keys(erreurs).length > 0) {
            setErreur(erreurs);
            return;
        }

        console.log("Technique sélectionnée :", techniqueId);
        console.log("Nail art :", nailArt);
        console.log("Jour sélectionné :", selectedDay);
        console.log("Heure sélectionnée :", selectedHour);

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
                    <div className="calendrier">
                        <div className="mois">
                            <p>Janvier</p>
                            <div className="navigation">
                                <p>Semaine-1-7</p>
                            </div>
                        </div>
                        <div className="grid-days">
                            {Days.map(day => (
                                <div key={day.name} className="column">
                                    <div className="day-name">
                                        <p>{day.name}</p>
                                    </div>
                                    <div className="grid-hours">
                                        {Hours.find(slotDay => slotDay.day === day.name)?.hour.map(hour => {
                                            const isSelected = selectedDay?.date === day.date && selectedHour === hour;
                                            return(
                                                < button 
                                                    key={hour}
                                                    type="button"
                                                    className={`hour-button ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => handleTime(day, hour)}
                                                >
                                                    {hour}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Affichage des erreurs de calendrier */}
                        {erreur.date && <div className="error-message"><TriangleAlert size={20}/>{erreur.date}</div>}
                        {confirmationMessage && (   
                            <div className="message">
                                <p>{confirmationMessage}</p>
                            </div>
                        )}
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