import Image from 'next/image';
import '@/styles/about.scss';
import Button from '@/components/Button';

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
                                <Image src="/images/illustrations/Noeud.png" alt="Étoile" className="illu" width={75} height={75} id="noeud"/>
                                <Image src="/images/prothesiste/salon_1(web).jpg" alt="Studio"  width={500} height={300} className="photo-studio"/>
                                <Image src="/images/illustrations/Vernis.png" alt="Étoile" className="illu" width={75} height={75} id="vernis"/>

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
                                <Image src="/images/prothesiste/salon_2(web).jpg" alt="Studio"  width={500} height={300} className="photo-studio"/>
                                <Image src="/images/illustrations/Cuticule.png" alt="Étoile" className="illu" width={75} height={75} id="cuticule"/>
                            </div>
                        </div>
                    </div> 
                </div>
                <div id="quali-salon">
                    <div className="container-quali">
                        <div className="wrapper">
                            <div className="photo">
                                <Image src="/images/prothesiste/salon_3(web).jpg" alt="Studio"  width={500} height={300} className="photo-studio"/>
                                <Image src="/images/illustrations/Rond.png" alt="Étoile" className="illu" width={75} height={75} id="rond"/>
                                <Image src="/images/illustrations/Rond.png" alt="Étoile" className="illu" width={75} height={75} id="rond2"/>

                            </div>
                            <div className="container-texte">
                                <h2>Qualité</h2>
                                <div className="texte">
                                    <p>
                                        Parce que la beauté ne va pas sans la santé, j'accorde une importance capitale à l'hygiène au sein du salon. Chaque outil est rigoureusement désinfecté et j'utilise exclusivement des produits de haute qualité professionnelle. 
                                    </p>
                                    <p>
                                        Mon objectif ? Vous offrir une tenue longue durée et un résultat impeccable, tout en respectant la nature de vos ongles naturels. Vous êtes entre de bonnes mains.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <svg id="bottom-studio" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 90.5">
                <path d="M826.74,0c0,.09.07.25.3.25h39.2s13.12.12,13.12.12l18.69.2,185.18,5.12,152,7.49,136.74,8.51,112.25,7.49,96.25,5.97,79.01,3.78,71.49,1.55,57.35-1.14,45-3.51,34.41-5.35c17.77-3.61,35.73-8.75,51.75-16.96v76.64c.1.34-.25.42-.43.25l-.82.04h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-1.5s-.5,0-.5,0h-2.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-3.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-2s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-2.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-2s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-2.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-1.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-2s-.5,0-.5,0h-1.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-2s-.5,0-.5,0h-.5s-.5,0-.5,0h-2s-.5,0-.5,0h-.5s-.5,0-.5,0h-.51s-.58,0-.58,0h-148.9s-.51,0-.51,0h-1s-.5,0-.5,0h-2.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-1.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.51s-.57,0-.57,0h-111.91s-.51,0-.51,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.51s-.6,0-.6,0h-487.29s-.6,0-.6,0h-1.01s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-3s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-1.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.51,0-.51,0H7.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.5,0-.5,0h-.5s-.51,0-.51,0H.49s-.49,0-.49,0v-37.19s0-.54,0-.54v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.5,0-.5v-.5s0-.51,0-.51v-.49s0-.45,0-.45v-.3c16.69-2.66,33.49-4.99,50.45-7.08,23.52-2.9,47.04-5.36,70.66-7.54,34.15-3.16,68.21-5.76,102.45-8.02,42.99-2.83,85.75-5.09,128.79-6.98,51.36-2.26,102.36-3.93,153.76-5.25l176.34-3.04,29.13-.19,24.67-.38h90.5Z"/>
                </svg>
            </div>
            <div className="slide" id="about-rdv">
                <div className="wrapper container-rdv">
                    <h2>Prête à faire briller vos ongles ?</h2>
                    <p>Vous êtes conquise par l'univers NailShine ? N'hésitez plus et offrez-vous ce moment de détente que vous méritez. Cliquez sur le bouton ci-dessous pour choisir votre créneau et réserver votre séance. J'ai déjà hâte de vous rencontrer !</p>
                    <Button text="Prendre rendez-vous" url="/prendre-rdv"/>
                </div>
            </div>
        </>
    )
}