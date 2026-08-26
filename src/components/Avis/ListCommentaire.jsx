/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useAuth } from "@/config/Auth";
import '@/styles/commentaire.scss';
import Heart from '@/components/Heart';
import Button from "@/components/Button";
import { supabase } from "@/config/supabase";

export default function ListCommentaire({ commentaires, clientId, onSuppression}) {
    const { userProfil } = useAuth();

    // Supprimer un commentaire
    const handleDeleteCommentaire = async (commentaireId) => {
        try {
            const { error } = await supabase
                .from('commentaires')
                .delete()
                .eq('id', commentaireId);

            if (error) {
                console.error("Erreur lors de la suppression du commentaire :", error);
                return;
            }

            onSuppression?.(commentaireId);
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
        }
    };

    return (
        <div className="liste-commentaires">
            {commentaires.length === 0 ? (
            <p className="no-commentaire">Aucun commentaire pour le moment.</p>
            ) : (
            commentaires.map((commentaire) => (
                <div key={commentaire.id} className="div-commentaire">
                    {userProfil?.role === 'admin' &&(
                        <Button text="Supprimer" className="btn-supprimer" onClick={() => handleDeleteCommentaire(commentaire.id)} />
                    )}
                    <div className="header">
                        <div className="infos">
                            <img src="/images/prothesiste/placeholder_pp.png" alt="placeholder"/>
                            <div className="infos-user">
                                <div className="avis">
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} className={`note ${n <= commentaire.note ? 'active' : ''}`}><Heart /></div>
                                    ))}
                                </div>
                                <p className="auteur">
                                    {commentaire.clients?.prenom} {commentaire.clients?.nom.charAt(0)}.
                                </p>
                            </div>
                        </div>
                        {clientId === commentaire.client_id && (
                            <div className="is-modele">
                                <img src="/images/illustrations/etoile.png" alt="Rond" id="etoile" className="illu" />
                                <p>Modèle de la pose</p>
                            </div>
                        )}
                    </div>
                    <div className="contenu"><p>{commentaire.contenu}</p></div>
                </div>
            )))}
        </div>
    );
}