import Image from 'next/image';
import '@/styles/about.scss';

export default function PageAbout() {
    return(
        <>
            <div className="slide" id="about">
                <svg id="svg-about" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                    <path d="M0,1080s306.9-211.9,996.91-211.9C1920,868.1,1920,0,1920,0v1080H0Z"/>
                </svg>
                <div className="wrapper container-about">
                    <div className="citation">
                        <Image src="/images/illustrations/etoile.png" alt="Étoile" className="illu" width={75} height={75}/>
                        <p>
                            ‘‘ Parce que vos mains sont le prolongement de votre personnalité, je mets mon savoir-faire au service de votre beauté. ’’
                        </p>
                    </div>
                    <div className="nom">
                        <Image src="/images/illustrations/etoile.png" alt="Étoile" className="illu" width={75} height={75}/>
                        <h1>Nathalie Myers</h1>
                    </div>
                    <div className="texte">
                        <p>
                            Diplômée et passionnée, j'exerce le métier de prothésiste ongulaire depuis 5 ans. Au fil des années, j'ai perfectionné mes techniques pour vous offrir des prestations haute précision, alliant la santé de l'ongle à l'esthétique pure. Mon espace de travail a été pensé comme une parenthèse de détente, où chaque détail compte pour que vous repartiez avec le sourire (et des mains étincelantes !).
                        </p>
                    </div>
                    <div className="photo">
                        <Image src="/images/illustrations/etoile.png" alt="Étoile" className="illu etoile-1" width={75} height={75}/>
                        <Image src="/images/illustrations/etoile.png" alt="Étoile" className="illu etoile-2" width={75} height={75}/>
                        <Image src="/images/illustrations/Rond.png" alt="Étoile" className="illu rond-1" width={75} height={75}/>
                        <Image src="/images/illustrations/Rond.png" alt="Étoile" className="illu rond-2" width={75} height={75}/>
                        <Image src="/images/prothesiste/Nathalie-1.jpg" alt="Nathalie Myers" id="photo-nathalie" width={300} height={300}/>
                    </div>
                </div>
            </div>
            <div className="slide" id="salon">

            </div>
        </>
    )
}