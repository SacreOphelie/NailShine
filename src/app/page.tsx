import Image from "next/image";
import '@/styles/home.scss';

export default function Page() {
	return(
    <>
      <div className="slide" id="home">
          <div className="container">
            <div className="left">
              <Image src="/images/prothesiste/Cadre-1.png" alt="" width={400} height={500} id="cadre" />
              <Image src="/images/illustrations/Noeud.png" alt="" id="noeud" className="illu" width={75} height={75} />
              <Image src="/images/illustrations/Vernis.png" alt="" id="vernis" className="illu" width={75} height={125} />
            </div>
            <div className="right">
              <h1>Prothésiste ongulaire</h1>
              <p>Prête à rejoindre la communauté des ongles qui brillent ? Pour réserver votre séance en un clic, il vous suffit de vous connecter ou de créer votre compte juste en dessous. Cet espace vous permettra de valider votre rendez-vous et de gérer toutes vos séances en toute simplicité. Une question ? Contactez-moi par mail !</p>
              <div className="container-btn"></div>
            </div>
          </div>
      </div>
    </>
  )
}