/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/compte.scss';
import Button from '@/components/Button';
import { useState } from 'react';

export default function CompteClient({realisations, onSupprimer}) {

    const [reaSupprimer, setReaSupprimer] = useState(null);

    // Modifier le format de la date (JJ/MM/AAAA)
     const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };
    
    // Ouvre la popup de confirmation
    const demanderSuppression = (item) => {
        setReaSupprimer(item);
        console.log("Réalisation à supprimer :", item);
    };

    // Confirme la suppression
    const confirmerSuppression = () => {
        if (reaSupprimer) {
            onSupprimer?.(reaSupprimer.id);
        }
        setReaSupprimer(null);
    };

    // Ferme la popup sans supprimer
    const fermerPopup = () => {
        setReaSupprimer(null);
    };

    return(
        <div className="slide " id="admin">
            <div className="box-compte wrapper">
                <Button url="/ajouter-une-realisation" text="Ajouter une réalisation"className="btn-add button-secondary"/>
                <Button url="/mes-rdv" text="Mes rendez-vous"className="btn-rdv"/>
                <h2>Les réalisations</h2>
                {realisations?.map(item =>(
                    <div className="list-realisation" key={item.id}>
                        <div className="infos">
                            <img src={item.image_url} alt={item.titre} />
                            <div className="dateRea">
                                {formatDate(item.date)}
                            </div>
                            <div className="titre">
                                <p>
                                    {item.titre}
                                </p>
                            </div>
                        </div>
                        <div className="actions">
                            <Button text="Voir" url={`/realisation/${item.id}`} className="button-secondary"/>
                            <Button text="Supprimer" className="button-secondary" onClick={() => demanderSuppression(item)}/>
                        </div>
                    </div>
                ))}
            </div>
            {/* Popup de confirmation */}
            {reaSupprimer && (
                <div className="popup-overlay" onClick={fermerPopup}>
                    <div className="popup-confirm" onClick={(e) => e.stopPropagation()}>
                        <p>Voulez-vous vraiment supprimer cette réalisation  ? </p>
                        <div className="popup-actions">
                            <Button onClick={fermerPopup} className="button-secondary" text="Retour" />
                            <Button onClick={confirmerSuppression} className="button-primary" text="Confirmer la suppression" type="submit" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}