/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import {supabase} from "@/config/supabase";
import Button from "@/components/Button";
import { contact } from "@/config/contact";
import SliderTechniques from "@/components/SliderTechniques";
import '@/styles/home.scss';
import CardRea from "@/components/Realisations/CardRea";
import Avis from "@/components/Avis/Avis";

export default async function Page() {
  // Calcul automatique des années d'expériences en fonction de l'année de début d'activité
  const anneeDebut = 2022;
  const experience = new Date().getFullYear() - anneeDebut + 1;
  const adresse = contact.lieu;

  // Supabase : récupérer les données de la table "techniques"
  const {data: techniques, error: errorTechniques} = await supabase
    .from('techniques')
    .select('*');
  if (errorTechniques) {
    console.error("Erreur lors de la récupération des techniques :", errorTechniques);
  }

  const {data: avis, error: errorAvis} = await supabase
    .from('avis')
    .select(`
      id_client,
      texte,
      clients(nom,prenom)
    `);
    if(errorAvis){
      console.error("Erreur lors de la récupération des avis :", errorAvis);
    }else{
      console.log("Avis récupérés :", avis);
    }

	return(
    <>
      <div className="slide" id="accueil">
          <div className="container wrapper">
            <div className="left">
              <Image src="/images/prothesiste/Cadre-1.png" alt="Prothésiste ongulaire"id="cadre" width={500} height={600} />
              <Image src="/images/illustrations/Noeud.png" alt="Noeud" id="noeud" className="illu" width={75} height={75} />
              <Image src="/images/illustrations/Vernis.png" alt="Vernis" id="vernis" className="illu" width={75} height={125} />
            </div>
            <div className="right">
              <h1>Prothésiste ongulaire
                <Image src="/images/illustrations/etoile.png" alt="Étoile" id="etoile" className="illu" width={75} height={75} />
              </h1>
              <div className="container-info">
                <div className="info">
                  <Image src="/icones/location.png" alt="Localisation" id="location" width={45} height={45} />
                  <p className="bolder"><strong>{adresse}</strong></p>
                </div>
                <div className="info">
                  <Image src="/icones/diplome.png" alt="Diplôme" id="diplome" width={45} height={45} />
                  <p className="bolder"><strong>{experience} ans</strong></p>
                </div>
              </div>
              <p>
                <strong>Prête à rejoindre la communauté des ongles qui brillent ?</strong> Pour réserver votre séance en un clic, il vous suffit de vous <strong> connecter ou de créer votre compte</strong>  juste en dessous. Cet espace vous permettra de valider votre rendez-vous et de gérer toutes vos séances en toute simplicité.
                <a href={`mailto:${contact.mail}`}> Une question ? Contactez-moi par mail !</a>
              </p>
              <div className="container-btn">
                <Button text="Créer mon compte" url="/creer-mon-compte" />
                <Button text="Prendre rendez-vous" url="/prendre-rdv" />
              </div>
            </div>
          </div>
      </div>
      <div id="top-techniques">
        <Image src="/images/illustrations/Rond.png" alt="Rond" id="rond1_technique" className="illu illu_grand" width={100} height={100} />
        <Image src="/images/illustrations/Rond.png" alt="Rond" id="rond2_technique" className="illu illu_petit" width={50} height={50} />
        <svg viewBox="0 0 1919 238.09" xmlns="http://www.w3.org/2000/svg">
            <path d="M1919,60.89v177.19H0V0c106.64,21.77,213.21,44.72,321.24,59.33,169.38,22.91,340.04,24.01,510.82,25.01,87.5.51,175.4,1.39,262.89,0,224.18-3.57,447.68-29.44,671.87-35.9,40.33-1.16,88.72-3.94,128.29,3.13,8.13,1.45,18.01,3.29,23.9,9.33Z"/>
        </svg>
      </div>
      <div className="slide" id="techniques">
        <div className="wrapper container">
          <h2>Techniques</h2>
          <SliderTechniques techniques={techniques} />
        </div>
        <div id="bottom-techniques">
          <Image src="/images/illustrations/etoile.png" alt="Rond" id="etoile1_technique" className="illu illu_grand" width={75} height={75} />
          <Image src="/images/illustrations/etoile.png" alt="Rond" id="etoile2_technique" className="illu illu_petit" width={50} height={50} />
          <svg viewBox="0 0 1919 238.09" xmlns="http://www.w3.org/2000/svg">
            <path d="M1919,60.89v177.19H0V0c106.64,21.77,213.21,44.72,321.24,59.33,169.38,22.91,340.04,24.01,510.82,25.01,87.5.51,175.4,1.39,262.89,0,224.18-3.57,447.68-29.44,671.87-35.9,40.33-1.16,88.72-3.94,128.29,3.13,8.13,1.45,18.01,3.29,23.9,9.33Z"/>
          </svg>
        </div>
      </div>
      <div className="slide" id="realisations">
        <div className="wrapper container">
            <h2>Réalisations</h2>
            <div className="container-rea">
              <CardRea />
              <CardRea />
              <CardRea />
              <CardRea />
              <CardRea />
              <CardRea />
            </div>
            <div className="container-btn">
              <Button text="Voir plus de réalisations" url="/realisations" />
            </div>
        </div>
        <div id="bottom-realisations">
          <svg viewBox="0 0 1919 238.09" xmlns="http://www.w3.org/2000/svg">
            <path d="M1919,60.89v177.19H0V0c106.64,21.77,213.21,44.72,321.24,59.33,169.38,22.91,340.04,24.01,510.82,25.01,87.5.51,175.4,1.39,262.89,0,224.18-3.57,447.68-29.44,671.87-35.9,40.33-1.16,88.72-3.94,128.29,3.13,8.13,1.45,18.01,3.29,23.9,9.33Z"/>
          </svg>
        </div>
      </div>
      <div className="slide" id="avis">
          <div className="wrapper container">
            <h2>Avis</h2>
          </div>
          <div className="slider-animation">
            <div className="container-avis">
              <Avis avis={avis} />
            </div>
            {/* Copie de la liste des avis pour l'effet de défilement */}
            <div className="container-avis" aria-hidden="true">
              <Avis avis={avis} />
            </div>
          </div>
      </div>
    </>
  )
}