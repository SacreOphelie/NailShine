import Image from "next/image";
import '@/styles/home.scss';
import Button from "@/components/Buttons/Button";
import { contact } from "@/config/contact";

export default function Page() {
  const anneeDebut = 2022;
  const experience = new Date().getFullYear() - anneeDebut + 1;
  const adresse = "Tubize 1480, Belgique";

	return(
    <>
      <div className="slide" id="home">
          <div className="container">
            <div className="left">
              <Image src="/images/prothesiste/Cadre-1.png" alt="Prothésiste ongulaire" width={400} height={500} id="cadre" />
              <Image src="/images/illustrations/Noeud.png" alt="Noeud" id="noeud" className="illu" width={75} height={75} />
              <Image src="/images/illustrations/Vernis.png" alt="Vernis" id="vernis" className="illu" width={75} height={125} />
            </div>
            <div className="right">
              <h1>Prothésiste ongulaire</h1>
              <div className="container-info">
                <div className="info">
                  <Image src="/icones/diplome.png" alt="Diplôme" width={45} height={45} />
                  <p className="bolder"><strong>{experience} ans</strong></p>
                  
                </div>
                <div className="info">
                  <Image src="/icones/location.png" alt="Localisation" width={38} height={37} />
                  <p className="bolder"><strong>{adresse}</strong></p>
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
    </>
  )
}