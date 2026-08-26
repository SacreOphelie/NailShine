"use client";

import '@/styles/confirm-rdv.scss';
import { TriangleAlert, X } from 'lucide-react';
import { contact } from "@/config/contact";
import Link from 'next/link';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ConfirmationRdv()  {
    const adresse = contact.adresse;
    const router = useRouter();

    // Créer une constante qui vérifie si on a bien pris rdv sinon redirection vers la page d'accueil
    const [haveRdv, setHaveRdv] = useState(false);
    const [rdvInfo, setRdvInfo] = useState(null);
    useEffect(() => {
        const access = sessionStorage.getItem('rdv_success');
        const infos = sessionStorage.getItem('rdv_info');

        if(!access){
            router.replace("/");
        }else{
            setHaveRdv(true);
            if(infos){
                setRdvInfo(JSON.parse(infos));
            }
        }
    },[router]);

    if(!haveRdv || !rdvInfo){
        return(
            <div className="slide"></div>
        )
    }
    return(
        <div className="slide" id="confirmation-rdv">
            <div className="box">
                <Image src="/images/illustrations/etoile.png" alt="etoile" className="illu" width={100} height={100} id="etoile1" />
                <Image src="/images/illustrations/etoile.png" alt="etoile2" className="illu" width={100} height={100} id="etoile2" />
                <Image src="/images/illustrations/Rond.png" alt="rond1" className="illu" width={100} height={100} id="rond1" />
                <h2>Votre rendez-vous est confirmé</h2>
                <p>Merci pour votre confiance ! J’ai hâte de m’occuper de vos ongles et de partager ce moment avec vous au salon.</p>
                <div className="bloc-info">
                    <p>Prestation : {rdvInfo?.prestation}</p>
                    <p>Date : {rdvInfo?.date}</p>
                    <p>Heure : {rdvInfo?.heure}</p>
                    <p>Prix : {rdvInfo?.prix} €</p>
                </div>
                <div className="adresse">
                    <Image src="/icones/location.png" alt="Localisation" width={100} height={100} id="location" />
                    <p>{adresse}</p>
                </div>
                <p>Vous pouvez retrouver, <strong>modifier</strong>  ou <strong>annuler</strong> ce rendez-vous (jusqu'à 24h à l'avance) à tout moment en vous connectant sur votre compte NailShine. Vous y trouverez également tout l'historique de vos poses.</p>
                <div className="alert">
                    <TriangleAlert size={20} strokeWidth={3} />
                    <p>Rappel important : Pour le respect de mon organisation, toute annulation tardive (moins de 24h) ou non-présentation injustifiée entraînera un acompte de réservation. <Link href="/conditions-generales"> Voir conditions générales</Link></p>
                </div>
                <div className="btn">
                    <Button text="Voir le rendez-vous" url="/compte" />
                </div>
            </div>
        </div>
    );
}