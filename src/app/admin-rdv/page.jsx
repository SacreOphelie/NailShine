/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/admin-rdv.scss';
import { useAuth } from '@/config/Auth';
import { supabase } from "@/config/supabase";
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

// Les horaires disponibles pour chaque jour de la semaine
// (mêmes horaires que la page de prise de rdv)
const Hours = ["10h", "14h", "16h"];

// Générer les jours de la semaine avec leurs dates correspondantes
const Week = (startDate = 0) => {
    const Now = new Date();
    const Days = Now.getDay(); // dimanche = 0, lundi = 1, ..., samedi = 6

    // Trouver lundi : si on est dimanche on recule de 6 jours sinon on recule jusqu'au lundi
    const Monday = Days === 0 ? -6 : 1 - Days;

    // Calculer la date du lundi de la semaine actuelle
    const currentMonday = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate() + Monday + (startDate * 7));

    const weekDays = [];

    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Création des 6 jours du calendrier à partir du lundi
    for (let i = 0; i < 6; i++) {
        const currentDay = new Date(currentMonday);
        currentDay.setDate(currentMonday.getDate() + i);

        const year = currentDay.getFullYear();
        const month = String(currentDay.getMonth() + 1).padStart(2, '0');
        const day = String(currentDay.getDate()).padStart(2, '0');

        weekDays.push({
            name: dayNames[currentDay.getDay()],
            date: `${year}-${month}-${day}` // Format YYYY-MM-DD
        });
    }
    return weekDays;
}

export default function AdminRdv() {
    const { userProfil, isConnected ,loading} = useAuth();
    const router = useRouter();

    // Navigation dans les semaines
    const [currentWeek, setCurrentWeek] = useState(0);

    // rendez-vous déjà pris, enrichis avec les infos client + technique
    const [booked, setBooked] = useState([]);

    // rdv sélectionné pour affichage du détail
    const [selectedRdv, setSelectedRdv] = useState(null);

    // Gestion de la redirection si l'utilisateur n'est pas connecté
    useEffect(() => {
        if (!loading && (!isConnected || userProfil?.role !== 'admin')) {
            router.push('/');
        }
    }, [loading, isConnected, userProfil, router]);

    // Récupérer les rendez-vous déjà pris, avec les infos client + technique
    useEffect(() => {
        const fetchBooked = async () => {
            try {
                // On joint la table clients et techniques pour avoir le détail du rdv
                // Adapte les noms de relations (client:..., technique:...) selon tes clés étrangères réelles
                const { data, error } = await supabase
                    .from('rendez_vous')
                    .select(`
                        id,
                        date_heure,
                        nail_art,
                        inspiration,
                        commentaire,
                        client:client_id ( id, nom, prenom, email),
                        technique:technique_id ( id, nom, prix )
                    `);

                if (error) {
                    console.error("Erreur lors de la récupération des rendez-vous :", error);
                } else if (data) {
                    setBooked(data);
                }
            } catch (error) {
                console.error("Erreur système", error);
            }
        };
        fetchBooked();
    }, [currentWeek]);

    // Générer les jours de la semaine à afficher dans le calendrier
    const Days = Week(currentWeek);

    // Récupérer le mois du premier jour de la semaine
    const firstDayOfWeek = new Date(Days[0].date);
    const monthName = firstDayOfWeek.toLocaleString('fr-FR', { month: 'long' });
    const month = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // Récupérer le début et la fin de semaine
    const startWeek = Days[0].date.split('-')[2];
    const endWeek = Days[Days.length - 1].date.split('-')[2];

    // navigation entre les semaines
    const previousWeek = () => {
        if (currentWeek > 0) {
            setCurrentWeek(prev => prev - 1);
        }
    };
    const nextWeek = () => setCurrentWeek(prev => prev + 1);

    // Même logique de formatage de date que côté client, pour comparer les créneaux
    const FormatDateSupabase = (dateStr, hourStr) => {
        const hourNumber = parseInt(hourStr.replace('h', ''), 10);
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day, hourNumber, 0, 0);
        return date.toISOString();
    }

    // Ouvrir le détail d'un rdv pris
    const handleSelectRdv = (rdv) => {
        setSelectedRdv(rdv);
    }

   if (loading || !isConnected || userProfil?.role !== 'admin') {
        return (
            <div className="slide"></div>
        );
    }

    return (
        <div className="slide" id="admin-rdv">
            <div className="box-admin wrapper">
                <Button text="Mon compte" url="/compte" className="btn-compte"/>
                <h2>Rendez-vous pris</h2>
                <div className="calendrier">
                    <div className="mois">
                        <p>{month}</p>
                        <div className="navigation">
                            {currentWeek > 0 ? (
                                <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" onClick={previousWeek} />
                            ) : (
                                <div style={{ width: '0px' }}></div>
                            )}
                            <p>{startWeek} - {endWeek}</p>
                            <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" onClick={nextWeek} />
                        </div>
                    </div>
                    <div className="grid-days">
                        {Days.map(day => {
                            return (
                                <div key={day.name} className="column">
                                    <div className="day-name">
                                        <p>{day.name}</p>
                                    </div>
                                    <div className="grid-hours">
                                        {Hours.map(hour => {
                                            // le format de l'heure pour comparer avec les rdv en base
                                            const currentItemISO = FormatDateSupabase(day.date, hour);

                                            // On cherche si un rdv existe pour ce créneau (inverse de la page client)
                                            const rdv = booked.find(item => item.date_heure.substring(0, 16) === currentItemISO.substring(0, 16));

                                            const isBooked = !!rdv;

                                            return (
                                                <button key={hour} type="button" className={`hour-button ${!isBooked ? 'not-booked' : 'disabled'}`} onClick={() => isBooked && handleSelectRdv(rdv)} disabled={!isBooked}>
                                                    {hour}
                                                    {isBooked && rdv.client && (
                                                        <span className="client-name">
                                                            {rdv.client.prenom} {rdv.client.nom}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {selectedRdv && (
                    <div className="details-rdv">
                        <p><strong>Client :</strong> {selectedRdv.client?.prenom} {selectedRdv.client?.nom}</p>
                        <p><strong>Email :</strong> {selectedRdv.client?.email}</p>
                        <p><strong>Prestation :</strong> {selectedRdv.technique?.nom}{selectedRdv.nail_art ? ' + Nail Art' : ''}</p>
                        <p><strong>Date :</strong> {new Date(selectedRdv.date_heure).toLocaleString('fr-FR')}</p>
                        {selectedRdv.commentaire && <p><strong>Commentaire :</strong> {selectedRdv.commentaire}</p>}
                        {selectedRdv.inspiration && (
                            <>
                                <p><strong>Inspirations :</strong></p>
                                <img src={selectedRdv.inspiration} alt="Inspiration" className="preview-image" />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}