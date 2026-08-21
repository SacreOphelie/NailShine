"use client";

import { useState, useMemo } from 'react';
import Filtre from '@/components/Realisations/Filtre';
import RealisationsList from '@/components/Realisations/realisationList';

export default function RealisationsFiltres({ realisations, techniques }) {
    const [selectedFiltres, setSelectedFiltres] = useState({
        techniques: [],
        saisons: [],
        couleurs: []
    });

    // Ajoute/retire une valeur du tableau correspondant
    const onToggleFiltre = (type, value) => {
        setSelectedFiltres((prev) => {
            const current = prev[type];
            const isSelected = current.includes(value);
            return {
                ...prev,
                [type]: isSelected
                    ? current.filter((v) => v !== value)
                    : [...current, value]
            };
        });
    };

    // Filtrage recalculé uniquement quand les données ou la sélection changent
    const realisationsFiltrees = useMemo(() => {
        return realisations.filter((rea) => {
            // Technique : soit un technique_id classique, soit le nail_art à true
            const techniqueOk =
                selectedFiltres.techniques.length === 0 ||
                selectedFiltres.techniques.some((id) => {
                    const techniqueSelectionnee = techniques.find(t => t.id === id);
                    if (techniqueSelectionnee?.nail_art) {
                        return rea.nail_art === true;
                    }
                    return rea.technique_id === id;
                });

            const saisonOk =
                selectedFiltres.saisons.length === 0 ||
                selectedFiltres.saisons.includes(rea.saison);

            const couleurOk =
                selectedFiltres.couleurs.length === 0 ||
                selectedFiltres.couleurs.includes(rea.couleur);

            return techniqueOk && saisonOk && couleurOk;
        });
    }, [realisations, techniques, selectedFiltres]);

    return (
        <>
            <Filtre
                techniques={techniques}
                selectedFiltres={selectedFiltres}
                onToggleFiltre={onToggleFiltre}
            />
            <h2>Réalisations</h2>
            <RealisationsList realisations={realisationsFiltrees} />
        </>
    );
}