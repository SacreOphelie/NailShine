/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import {supabase} from "@/config/supabase";

import Button from "@/components/Buttons/Button";
import { contact } from "@/config/contact";

export default async function Page() {
  const anneeDebut = 2022;
  const experience = new Date().getFullYear() - anneeDebut + 1;
  const adresse = "Tubize 1480, Belgique";

  // Supabase : récupérer les données de la table "techniques"
  const {data: techniques, error} = await supabase
    .from('techniques')
    .select('*');
  if (error) {
    console.error("Erreur lors de la récupération des techniques :", error);
  }

	return(
    <>
      <div className="slide" id="accueil">
          <div className="container wrapper">
            <div className="left">
              <img src="/images/prothesiste/Cadre-1.png" alt="Prothésiste ongulaire"id="cadre" />
              <img src="/images/illustrations/Noeud.png" alt="Noeud" id="noeud" className="illu"/>
              <img src="/images/illustrations/Vernis.png" alt="Vernis" id="vernis" className="illu"/>
            </div>
            <div className="right">
              <h1>Prothésiste ongulaire
                <img src="/images/illustrations/etoile.png" alt="Étoile" id="etoile" className="illu" />
              </h1>
              <div className="container-info">
                <div className="info">
                  <img src="/icones/location.png" alt="Localisation" id="location" />
                  <p className="bolder"><strong>{adresse}</strong></p>
                </div>
                <div className="info">
                  <img src="/icones/diplome.png" alt="Diplôme"/>
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
      <svg id="top-techniques" viewBox="0 0 1919 238.09" xmlns="http://www.w3.org/2000/svg">
          <path d="M1919,60.89v177.19H0V0c106.64,21.77,213.21,44.72,321.24,59.33,169.38,22.91,340.04,24.01,510.82,25.01,87.5.51,175.4,1.39,262.89,0,224.18-3.57,447.68-29.44,671.87-35.9,40.33-1.16,88.72-3.94,128.29,3.13,8.13,1.45,18.01,3.29,23.9,9.33Z"/>
      </svg>
      <div className="slide" id="techniques">
        <div className="wrapper container">
            <h2>Techniques</h2>
            <div className="slider">
              {techniques?.map(technique => (
                <div className="card" key={technique.id} style={{backgroundImage: `url(${technique.image_url})`}}>
                  <div className="technique">
                    <h4>{technique.nom}</h4>
                    <p>{technique.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </>
  )
}