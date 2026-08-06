/* eslint-disable @next/next/no-img-element */
import '@/styles/confirm-rdv.scss';
import { TriangleAlert, X } from 'lucide-react';
import { contact } from "@/config/contact";
import Link from 'next/link';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function ConfirmationRdv()  {
    const adresse = contact.adresse;
    const router = useRouter();

    // Créer une constante qui vérifie si on a bien pris rdv sinon redirection vers la page d'accueil
    const [haveRdv, setHaveRdv] = useState(false);
    useEffect(() => {
        const access = sessionStorage.getItem('rdv_success');

        if(!access){
            router.replace("/");
        }else{
            setHaveRdv(true);
            sessionStorage.removeItem('rdv_success');
        }
    },[router]);

    if(!haveRdv){
        return(
            <div className="slide"></div>
        )
    }
    return(
        <div className="slide" id="confirmation-rdv">
            <div className="box">
                <img src="/images/illustrations/etoile.png" alt="etoile" className="illu" id="etoile1" />
                <img src="/images/illustrations/etoile.png" alt="etoile2" className="illu" id="etoile2" />
                <img src="/images/illustrations/Rond.png" alt="rond1" className="illu" id="rond1" />
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
                    <p>{adresse}</p>
                </div>
                <p>Vous pouvez retrouver, <strong>modifier</strong>  ou <strong>annuler</strong> ce rendez-vous (jusqu'à 24h à l'avance) à tout moment en vous connectant sur votre compte NailShine. Vous y trouverez également tout l'historique de vos poses.</p>
                <div className="alert">
                    <TriangleAlert size={20} stroke-width={2} />
                    <p>Rappel important : Pour le respect de mon organisation, toute annulation tardive (moins de 24h) ou non-présentation injustifiée entraînera un acompte de réservation. <Link href="/conditions-generales"> Voir conditions générales</Link></p>
                </div>
                <div className="btn">
                    <Button text="Voir le rendez-vous" />
                </div>
            </div>
        </div>
    );
}