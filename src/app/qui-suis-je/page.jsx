import Image from 'next/image';
import '@/styles/about.scss';

export default function PageAbout() {
    return(
        <>
            <div className="slide" id="about">
                <svg id="svg-about" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
                    <path d="M0,1080s306.9-211.9,996.91-211.9C1920,868.1,1920,0,1920,0v1080H0Z"/>
                </svg>
                <div className="container-about">
                    <div className="wrapper">
                        <div className="container-texte">
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
            </div>
            <div className="info-studio">
                <div id="studio">
                    <div className="container-salon">
                        <div className="wrapper">
                            <div className="photo">
                                <Image src="/images/prothesiste/salon_1(web).jpg" alt="Studio"  width={500} height={300}/>
                            </div>
                            <div className="container-texte">
                                <h2>Le studio</h2>
                                <div className="texte">
                                    <p>
                                        Plus qu’un simple salon de manucure, cet espace est un véritable cocon où l’on prend soin de vous et où le temps s’arrête. Ici, on mélange avec passion le travail sérieux, les éclats de rire et, on ne va pas se mentir, un petit peu de drama pour pimenter la séance ! 
                                    </p>
                                    <p>
                                        Que vous veniez pour une transformation radicale ou pour une pause détente, vous êtes ici chez vous. On discute, on rigole, et on repart avec des ongles qui brillent.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="localisation-salon">
                    <div className="container-location">
                        <div className="wrapper">
                            <div className="container-texte">
                                <h2>Situé à Tubize</h2>
                                <div className="texte">
                                    <p>
                                        Situé en Wallonie, au cœur de Tubize, le salon a été choisi pour vous faciliter la vie. Pour votre confort, un parking gratuit est disponible juste devant la porte. 
                                    </p>
                                    <p>
                                        Vous venez en transports en commun ? Aucun souci : le salon est idéalement desservi à proximité par le bus et le train. Une localisation stratégique pour une pause beauté sans stress.
                                    </p>
                                </div>
                            </div>
                            <div className="photo">
                                <Image src="/images/prothesiste/salon_2(web).jpg" alt="Studio"  width={500} height={300}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="quali-salon">
                    <div className="container-quali">
                        <div className="wrapper">
                            <div className="photo">
                                <Image src="/images/prothesiste/salon_3(web).jpg" alt="Studio"  width={500} height={300}/>
                            </div>
                            <div className="container-texte">
                                <h2>Qualité</h2>
                                <div className="texte">
                                    <p>
                                        Situé en Wallonie, au cœur de Tubize, le salon a été choisi pour vous faciliter la vie. Pour votre confort, un parking gratuit est disponible juste devant la porte. 
                                    </p>
                                    <p>
                                        Vous venez en transports en commun ? Aucun souci : le salon est idéalement desservi à proximité par le bus et le train. Une localisation stratégique pour une pause beauté sans stress.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}