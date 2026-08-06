/* eslint-disable @next/next/no-img-element */
import '@/styles/confirm-rdv.scss';
import { TriangleAlert, X } from 'lucide-react';
import { contact } from "@/config/contact";
import Link from 'next/link';

export default function ConfirmationRdv()  {
    const adresse = contact.lieu;
    return(
        <div className="slide" id="confirmation-rdv">
            <div className="box">
                <h2>Votre rendez-vous est confirmé</h2>
                <p>Merci pour votre confiance ! J’ai hâte de m’occuper de vos ongles et de partager ce moment avec vous au salon.</p>
                <div className="bloc-info">
                    <p>Prestation : (nom de la prestation)</p>
                    <p>Date : (date du rendez-vous)</p>
                    <p>Heure : (heure du rendez-vous)</p>
                    <p>Prix : (prix de la prestation)</p>
                </div>
                <div className="adresse">
                    <img src="/icones/location.png" alt="Localisation" id="location" />
                    <p className="bolder"><strong>{adresse}</strong></p>
                </div>
                <p>Vous pouvez retrouver, <strong>modifier</strong>  ou <strong>annuler</strong> ce rendez-vous (jusqu'à 24h à l'avance) à tout moment en vous connectant sur votre compte NailShine. Vous y trouverez également tout l'historique de vos poses.</p>
                <div className="alert">
                    <TriangleAlert size={20}/>
                    <p>Rappel important : Pour le respect de mon organisation, toute annulation tardive (moins de 24h) ou non-présentation injustifiée entraînera un acompte de réservation. <Link href="/conditions-generales"> Voir conditions générales</Link></p>
                </div>
            </div>
        </div>
    );
}