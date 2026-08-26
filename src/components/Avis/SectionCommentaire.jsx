"use client";

import { useState } from 'react';
import Commentaire from './Commentaire';
import ListCommentaire from './ListCommentaire';

export default function CommentairesSection({ realisationId, commentairesInitiaux, clientId }) {
    const [commentaires, setCommentaires] = useState(commentairesInitiaux);

    // Ajouter le nouveau commentaire en tête de liste, sans refetch
    const handleAjout = (nouveauCommentaire) => {
        setCommentaires(prev => [nouveauCommentaire, ...prev]);
    };

    // Retirer le commentaire supprimé de la liste
    const handleSuppression = (commentaireId) => {
        setCommentaires(prev => prev.filter(c => c.id !== commentaireId));
    };

    return (
        <>
            <Commentaire realisationId={realisationId} onCommentaireAjoute={handleAjout} />
            <ListCommentaire commentaires={commentaires} clientId={clientId} onSuppression={handleSuppression} />
        </>
    );
}