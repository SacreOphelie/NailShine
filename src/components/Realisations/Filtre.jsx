/* eslint-disable @next/next/no-img-element */
"use client";

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const saisons =[
    {id:"printemps", nom:"Printemps"},
    {id:"été", nom:"Été"},
    {id:"automne", nom:"Automne"},
    {id:"hiver", nom:"Hiver"}
]
const couleurs =[
    {id:"rouge", nom:"Rouge"},
    {id:"rose", nom:"Rose"},
    {id:"violet", nom:"Violet"},
    {id:"bleu", nom:"Bleu"},
    {id:"vert", nom:"Vert"},
    {id:"jaune", nom:"Jaune"},
    {id:"orange", nom:"Orange"},
    {id:"marron", nom:"Marron"},
    {id:"blanc", nom:"Blanc"},
    {id:"noir", nom:"Noir"},
    {id:"argent", nom:"Argenté"},
    {id:"or", nom:"Doré"},
    {id:"multicolore", nom:"Multicolore"},
    {id:"paillette", nom:"Paillette"}
]

export default function Filtre() {
    const [isOpenTechniques, setIsOpenTechniques] = useState(false);
    const [isOpenSaisons, setIsOpenSaisons] = useState(false);
    const [isOpenCouleurs, setIsOpenCouleurs] = useState(false);

    return (
        <>
            <div className="container-filtre">
                <SlidersHorizontal size={50} />
                <div className="content">
                    <div className={`filtre filtre-techniques ${isOpenTechniques ? 'is-open' : ''}`} onClick={() => setIsOpenTechniques(!isOpenTechniques)}>
                        <p>Techniques</p>
                        <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
                        <div className="infos-filtre">
                            <p>Semi-permanent</p>
                            <p>Acrylique</p>
                            <p>Nail art</p>
                            <p>Gainage</p>
                        </div>
                    </div>

                    <div className={`filtre filtre-saisons ${isOpenSaisons ? 'is-open' : ''}`} onClick={() => setIsOpenSaisons(!isOpenSaisons)} >
                        <p>Saisons</p>
                        <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
                        <div className="infos-filtre">
                            {saisons.map((saison) => (
                                <p key={saison.id}>{saison.nom}</p>
                            ))}
                        </div>
                    </div>

                    <div className={`filtre filtre-couleurs ${isOpenCouleurs ? 'is-open' : ''}`} onClick={() => setIsOpenCouleurs(!isOpenCouleurs)} >
                        <p>Couleurs</p>
                        <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
                        <div className="infos-filtre filtre-couleurs">
                            {couleurs.map((couleur) => (
                                <div className={`couleurs couleur-${couleur.id}`} key={couleur.id}></div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}