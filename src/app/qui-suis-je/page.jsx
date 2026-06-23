/* eslint-disable @next/next/no-img-element */
import '@/styles/about.scss';

export default function PageAbout() {
    return(
        <>
            <div className="slide" id="about">
                <svg id="svg-about" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
                    <path d="M0,1080s306.9-211.9,996.91-211.9C1920,868.1,1920,0,1920,0v1080H0Z"/>
                </svg>
                <div className="container wrapper">
                    <div className="citation">
                        <p>
                            ‘‘ Parce que vos mains sont le prolongement de votre personnalité, je mets mon savoir-faire au service de votre beauté. ’’
                        </p>
                    </div>
                    <div className="nom">
                        <h1>Nathalie Myers</h1>
                    </div>
                    <div className="texte">
                        <p>
                            Diplômée et passionnée, j'exerce le métier de prothésiste ongulaire depuis 5 ans. Au fil des années, j'ai perfectionné mes techniques pour vous offrir des prestations haute précision, alliant la santé de l'ongle à l'esthétique pure. Mon espace de travail a été pensé comme une parenthèse de détente, où chaque détail compte pour que vous repartiez avec le sourire (et des mains étincelantes !).
                        </p>
                    </div>
                </div>
                <img src="images/prothesiste/Nathalie-1.jpg" alt="Nathalie Myers"></img>
            </div>
            <div className="slide" id="salon">

            </div>
        </>
    )
}