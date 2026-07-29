/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/rdv.scss';
import {useAuth} from "@/config/Auth";
import {supabase} from "@/config/supabase";
import Select from '@/components/Forms/Select';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { TriangleAlert, X } from 'lucide-react';


// Les horaires disponibles pour chaque jour de la semaine
const Hours = ["10h", "14h", "16h"];

// Générer les jours de la semaine avec leurs dates correspondantes
const Week = (startDate = 0) => {
    const Now = new Date();
    const Days = Now.getDay(); // dimanche = 0, lundi = 1, ..., samedi = 6

    // Trouver lundi : si on est dimanche on recule de 6 jours sinon on recule jusqu'au lundi
    const Monday = Days === 0 ? -6 : 1 - Days;
    
    // Calculer la date du lundi de la semaine actuelle
    const currentMonday = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate() + Monday + (startDate*7));

    const weekDays = [];

    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Création des 6 jours du calendrier à partir du lundi
    for(let i = 0; i<6; i++){
        const currentDay = new Date(currentMonday);
        currentDay.setDate(currentMonday.getDate()+i);

        const year = currentDay.getFullYear();
        const month = String(currentDay.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const day = String(currentDay.getDate()).padStart(2, '0'); // Ajouter un zéro devant si le jour est inférieur à 10

        weekDays.push({
            name: dayNames[currentDay.getDay()],
            date: `${year}-${month}-${day}` // Format YYYY-MM-DD
        });
    }
    return weekDays;
}


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

    // Navigation dans les semaines
    const [currentWeek, setCurrentWeek] = useState(0);

    // Ajout de l'ajout d'une fichier 
    const [inspirationFile, setInspirationFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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

    // Générer les jours de la semaine à afficher dans le calendrier
    const Days = Week(currentWeek);

    // Récupérer le mois du premier jour de la semaine
    const firstDayOfWeek = new Date(Days[0].date);
    const monthName = firstDayOfWeek.toLocaleString('fr-FR', { month: 'long' });
    const month = monthName.charAt(0).toUpperCase() + monthName.slice(1); // Mettre la première lettre en majuscule

    // Récupérer le début et la fin de semaine 
    const startWeek = Days[0].date.split('-')[2];
    const endWeek = Days[Days.length - 1].date.split('-')[2];

    // navigation entre les semaines
    const previousWeek = () => {
        if(currentWeek > 0) {
            setCurrentWeek(prev => prev - 1);
        }
    };
    const nextWeek = () => setCurrentWeek(prev => prev + 1);

    // Logique de la sélection du jour et de l'heure
    const handleTime = (day, hour) => {
        setSelectedDay(day);
        setSelectedHour(hour);

        // Changer le format de la date pour l'affichage
        const dateObj = new Date(day.date);

        const dateFormat = dateObj.toLocaleDateString('fr-FR',{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        // Le message de confirmation se met à jour 
        const confirmationText = `Vous avez choisi le ${day.name} ${dateFormat} à ${hour}.`;
        setConfirmationMessage(confirmationText);
    };

    // Gestion du choix du fichier d'inspiration
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setInspirationFile(file);
            // générer un url pour afficher l'image choisie
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    // Supprimer l'image d'inspiration choisie
    const removeInspiration = () => {
        setInspirationFile(null);
        setPreviewUrl(null);
    }

    // Envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        setErreur({});

        const erreurs = {};

        if(!techniqueId)
        {
            erreurs.techniqueId = "Veuillez sélectionner une technique.";
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
        console.log("Fichier d'inspiration :", inspirationFile);
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
                            <p>{month}</p>
                            <div className="navigation">
                                {currentWeek > 0 ? (
                                    <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" onClick={previousWeek}/>
                                ) : (
                                    <div style={{ width: '0px'}}></div>
                                )}
                                <p>{startWeek} - {endWeek}</p>
                                <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" onClick={nextWeek}/>
                            </div>
                        </div>
                        <div className="grid-days">
                            {Days.map(day => {

                                // Récupérer l'info que le jour est passé 
                                const dayDate = new Date(day.date);
                                const today = new Date();
                                // Si c'est plus petit ou égal à aujourd'hui, le jour est passé
                                const isPast = dayDate <= today;

                                return(
                                    <div key={day.name} className={`column ${isPast ? 'past-day' : ''}`}>
                                        <div className="day-name">
                                            <p>{day.name}</p>
                                        </div>
                                        <div className="grid-hours">
                                            {Hours.map(hour => {
                                                const isSelected = selectedDay?.date === day.date && selectedHour === hour;
                                                return(
                                                    < button 
                                                        key={hour}
                                                        type="button"
                                                        className={`hour-button ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => !isPast && handleTime(day, hour)}
                                                        disabled={isPast}
                                                    >
                                                        {hour}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );

                            })}
                        </div>
                    </div>
                    {/* Affichage des erreurs de calendrier */}
                    {erreur.date && <div className="error-message"><TriangleAlert size={20}/>{erreur.date}</div>}
                    {confirmationMessage && (   
                        <div className="message">
                            <p>{confirmationMessage}</p>
                        </div>
                    )}
                    <div className="container-inspiration">
                        <div className="inspiration">
                            <p>Une inspiration en tête ?</p>
                            <Input type="file" onChange={handleFileChange} accept="image/*" id="inspiration-file" style={{ display: 'none' }}/>
                            <label htmlFor="inspiration-file" className="btn-inspiration">
                                Joindre une inspiration
                            </label>
                        </div>
                        {previewUrl && (
                            <div className="preview">
                                <img src={previewUrl} alt="Aperçu de l'inspiration" className="preview-image"/>
                                <button onClick={removeInspiration}>
                                    <X size={20} />
                                </button>
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