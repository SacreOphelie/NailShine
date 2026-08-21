/* eslint-disable @next/next/no-img-element */
"use client";

import { SlidersHorizontal } from 'lucide-react';
import { useState , useEffect, useRef} from 'react';

const saisons = [
    { id: "printemps", nom: "Printemps" },
    { id: "été", nom: "Été" },
    { id: "automne", nom: "Automne" },
    { id: "hiver", nom: "Hiver" }
];
const couleurs = [
    { id: "rouge", nom: "Rouge" },
    { id: "rose", nom: "Rose" },
    { id: "violet", nom: "Violet" },
    { id: "bleu", nom: "Bleu" },
    { id: "vert", nom: "Vert" },
    { id: "jaune", nom: "Jaune" },
    { id: "orange", nom: "Orange" },
    { id: "marron", nom: "Marron" },
    { id: "blanc", nom: "Blanc" },
    { id: "noir", nom: "Noir" },
    { id: "argent", nom: "Argenté" },
    { id: "or", nom: "Doré" },
    { id: "multicolore", nom: "Multicolore" },
    { id: "paillette", nom: "Paillette" }
];

export default function Filtre({ techniques, selectedFiltres, onToggleFiltre }) {
    // Gestion de l'état d'ouverture des filtres
    const [isOpenTechniques, setIsOpenTechniques] = useState(false);
    const [isOpenSaisons, setIsOpenSaisons] = useState(false);
    const [isOpenCouleurs, setIsOpenCouleurs] = useState(false);
    const [isOpenMenuFiltre, setIsOpenMenuFiltre] = useState(false);

    
    // Gestion de la fermeture des filtres au clic en dehors
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpenTechniques(false);
                setIsOpenSaisons(false);
                setIsOpenCouleurs(false);
                setIsOpenMenuFiltre(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])


    return (
        <>
        {/* Ajout des classes pour ouvrir les filtres */}
            <div ref={containerRef} className={`container-filtre ${isOpenMenuFiltre ? 'is-open-menu-filtre' : ''}`} onClick={() => setIsOpenMenuFiltre(!isOpenMenuFiltre)}>
                <SlidersHorizontal size={50} />
                <div className="content">
                    <div className={`filtre filtre-techniques ${isOpenTechniques ? 'is-open' : ''}`} onClick={(e) => {e.stopPropagation(); setIsOpenTechniques(!isOpenTechniques); }}>
                        <p>Techniques</p>
                        <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
                        <div className="infos-filtre">
                            {techniques.map((technique) => (
                                // Si la technique est sélectionnée, on ajoute la classe "selected"
                                // On empêche la propagation de l'événement pour ne pas fermer le filtre
                                // On appelle la fonction onToggleFiltre pour ajouter ou retirer la technique sélectionnée
                                // Si la technique est "nail_art", on affiche "Nail art" à la place du nom de la technique
                                <p key={technique.id} className={selectedFiltres.techniques.includes(technique.id) ? 'selected' : ''} onClick={(e) => { e.stopPropagation(); onToggleFiltre('techniques', technique.id); }}>
                                    {technique.nail_art ? 'Nail art' : technique.nom}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className={`filtre filtre-saisons ${isOpenSaisons ? 'is-open' : ''}`} onClick={(e) => {e.stopPropagation(); setIsOpenSaisons(!isOpenSaisons);}}>
                        <p>Saisons</p>
                        <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
                        <div className="infos-filtre">
                            {saisons.map((saison) => (
                                <p key={saison.id} className={selectedFiltres.saisons.includes(saison.id) ? 'selected' : ''} onClick={(e) => { e.stopPropagation(); onToggleFiltre('saisons', saison.id); }} >
                                    {saison.nom}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className={`filtre filtre-couleurs ${isOpenCouleurs ? 'is-open' : ''}`} onClick={(e) => {e.stopPropagation(); setIsOpenCouleurs(!isOpenCouleurs);}}>
                        <p>Couleurs</p>
                        <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
                        <div className="infos-filtre filtre-couleurs">
                            {couleurs.map((couleur) => (
                                <div className={`couleurs couleur-${couleur.id} ${selectedFiltres.couleurs.includes(couleur.id) ? 'selected' : ''}`} key={couleur.id} onClick={(e) => { e.stopPropagation(); onToggleFiltre('couleurs', couleur.id); }} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}