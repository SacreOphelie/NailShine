"use client";

import '@/styles/compte.scss';
import {useState, useEffect, useRef} from 'react';
import Button from '@/components/Button';

export default function CompteClient({ rendezVous }) {
     const [activeTab, setActiveTab] = useState('a-venir'); 
    //  petite barre de slider
    const [sliderPosition, setSliderPosition] = useState({left: 0, width: 0});
    const sliderRef = useRef(null);
    // Animer la hauteur de la box-compte en fonction du contenu
    const [boxHeight, setBoxHeight] = useState('fit-content');
    const contentRef = useRef(null);
    const boxRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current) {
            // On cible les p qui ont la classe active
            const activeElement = sliderRef.current.querySelector('.active');
            
            if (activeElement) {
                // le slider se place en dessous des p
                setSliderPosition({
                    left: activeElement.offsetLeft,
                    width: activeElement.offsetWidth,
                });
            }
        }
    }, [activeTab]);
    // Mesure dynamique de la hauteur du contenu (en tenant compte du padding de la box)
    useEffect(() => {
        const contentEl = contentRef.current;
        const boxEl = boxRef.current;
        if (!contentEl || !boxEl) return;

        const updateHeight = () => {
            const boxStyles = window.getComputedStyle(boxEl);
            const paddingTop = parseFloat(boxStyles.paddingTop) || 0;
            const paddingBottom = parseFloat(boxStyles.paddingBottom) || 0;

            setBoxHeight(contentEl.scrollHeight + paddingTop + paddingBottom);
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(contentEl);

        return () => resizeObserver.disconnect();
    }, [activeTab, rendezVous]);

    // Modifier le format de la date (JJ/MM/AAAA)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };
    const now = new Date();

    // Séparation historique / à venir
    const aVenir = rendezVous
        ?.filter((item) => new Date(item.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const historique = rendezVous
        ?.filter((item) => new Date(item.date) < now)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const listeRdv = activeTab === 'a-venir' ? aVenir : historique;

    const handleAnnuler = (id) => {
        console.log('Annuler', id);
    };

    return(
        <div className="slide " id="compte">
            <svg id="svg-1" xmlns="http://www.w3.org/2000/svg" viewBox="500 0 900 1080">
                <path d="M970.64,26.35l20.74,1.5c152.71,15.51,270.65,153.74,330.74,285.02,17,37.14,25.88,75.28,34.25,115.19,9.68,46.18,17.56,95.5,18.14,142.78.01.84-.32,2.22.51,2.74v30.49c-.96,3.2-.44,7.1-.5,10.49-1.57,88.5-34.14,173.85-101.73,231.87-93.52,80.28-217.78,93.43-328.26,137.07-25.34,10.01-43.32,21.2-66.52,34.44-45.65,26.06-97.97,39.2-150.79,34.9-92.93-7.57-161.5-66.69-178.21-158.91-6.8-37.52-4.39-78.28,2.91-115.56,6.86-35.04,19.69-68.14,26.61-103.33,11.99-61.03,11.43-121.38,6.23-183.17-6.51-77.4-22.74-158.29,5.63-233.26,25.78-68.14,85.26-117.91,145.37-155.51,63.99-40.03,135.59-74.18,212.68-76.23l1.21-.52h20.99Z"/>
            </svg>
            <svg id="svg-2" xmlns="http://www.w3.org/2000/svg" viewBox="500 0 900 1080">
                <path d="M970.64,26.35l20.74,1.5c152.71,15.51,270.65,153.74,330.74,285.02,17,37.14,25.88,75.28,34.25,115.19,9.68,46.18,17.56,95.5,18.14,142.78.01.84-.32,2.22.51,2.74v30.49c-.96,3.2-.44,7.1-.5,10.49-1.57,88.5-34.14,173.85-101.73,231.87-93.52,80.28-217.78,93.43-328.26,137.07-25.34,10.01-43.32,21.2-66.52,34.44-45.65,26.06-97.97,39.2-150.79,34.9-92.93-7.57-161.5-66.69-178.21-158.91-6.8-37.52-4.39-78.28,2.91-115.56,6.86-35.04,19.69-68.14,26.61-103.33,11.99-61.03,11.43-121.38,6.23-183.17-6.51-77.4-22.74-158.29,5.63-233.26,25.78-68.14,85.26-117.91,145.37-155.51,63.99-40.03,135.59-74.18,212.68-76.23l1.21-.52h20.99Z"/>
            </svg>
            <div className="box-compte wrapper" ref={boxRef} style={{ height: boxHeight }}>
                <div className="container-tabs" ref={contentRef}>
                    <div className="tabs" ref={sliderRef}>
                        <p className={activeTab === 'historique' ? 'active' : ''} onClick={() => setActiveTab('historique')}>
                            Historique des rendez-vous
                        </p>
                        <p className={activeTab === 'a-venir' ? 'active' : ''} onClick={() => setActiveTab('a-venir')}>
                            Rendez-vous à venir
                        </p>
                        <div className="slider" style={sliderPosition}></div>
                    </div>
                    <div className="list-rdv">
                        {listeRdv?.length ? (
                            listeRdv.map((item) => (
                                <div className="barre-rdv" key={item.id}>
                                    <div className="infos">
                                        <div className="dateRdv">
                                            {formatDate(item.date)} {item.heure}
                                        </div>
                                        <div className="prestationRdv">{item.prestation}</div>
                                        <div className="prixRdv">{item.prix} €</div>
                                    </div>
                                    {activeTab === 'a-venir' && (
                                        <div className="actionsRdv">
                                            <Button onClick={() => handleAnnuler(item.id)} className="button-secondary" text="Annuler" />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty">
                                <p>Aucun rendez-vous {activeTab === 'a-venir' ? 'à venir' : 'passé'}.</p>
                                <Button url="/prendre-rdv" text="Prendre rendez-vous" className="btn-add"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}