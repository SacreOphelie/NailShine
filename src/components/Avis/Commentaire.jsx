"use client";

import { useState } from 'react';
import { useAuth } from "@/config/Auth";
import { supabase } from "@/config/supabase";
import Textarea from '@/components/Forms/Textarea';
import Button from '@/components/Button';
import Heart from '@/components/Heart';
import { TriangleAlert } from 'lucide-react';
import { Check } from 'lucide-react';
import '@/styles/commentaire.scss';

export default function Commentaire({ realisationId, onCommentaireAjoute }) {
    const { isConnected, userProfil, loading } = useAuth();

    // Stocker le contenu du commentaire et la note
    const [contenu, setContenu] = useState('');
    const [note, setNote] = useState(1);

    // Gestion des erreurs et du message de confirmation
    const [erreur, setErreur] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState('');

    // Envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur({});
        setConfirmationMessage('');

        const erreurs = {};
        if (!contenu) {
            erreurs.contenu = "Veuillez écrire un commentaire.";
        }
        if (Object.keys(erreurs).length > 0) {
            setErreur(erreurs);
            return;
        }

        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                console.error("Erreur lors de la récupération de l'utilisateur :", authError);
                return;
            }

            const commentaireData = {
                realisation_id: realisationId,
                client_id: user.id,
                contenu: contenu.trim(),
                note: note || 1
            };

            // insertion + récupération directe de la ligne créée (avec le join clients)
            const { data: inserted, error: insertError } = await supabase
                .from('commentaires')
                .insert([commentaireData])
                .select('*, clients(prenom, nom)')
                .single();

            if (insertError) {
                console.error("Erreur lors de l'insertion du commentaire :", insertError);
                throw insertError;
            }

            setConfirmationMessage("Votre commentaire a été publié avec succès !");
            setContenu('');
            setNote(1);

            // On remonte le commentaire créé au parent, plus besoin de router.refresh()
            onCommentaireAjoute?.(inserted);
        } catch (error) {
            console.error("Erreur lors de la publication du commentaire :", error);
        }
    };

    // Temps de chargement
    if (loading) return null;

    return (
        <div className="container-form">
            <h2>Donnez nous votre avis</h2>
            <p>Vos avis nous sont précieux ! Afin de préserver la convivialité du site, merci de rester courtois et respectueux dans vos commentaires. Tout propos injurieux, diffamatoire ou irrespectueux sera modéré. Faisons briller cet espace ensemble !</p>
            {isConnected && userProfil ? (
                <form onSubmit={handleSubmit}>
                    <div className="avis">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className={`note ${n <= note ? 'active' : ''}`}  onClick={() => setNote(n)}><Heart /></div>
                        ))}
                    </div>
                    {confirmationMessage && (
                        <div className="message"><Check size={20}/><p>{confirmationMessage}</p></div>
                    )}
                    <Textarea
                        placeholder="Votre commentaire..."
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                    />
                    {erreur.contenu && (
                        <div className="error-message" >
                            <TriangleAlert size={20} />{erreur.contenu}
                        </div>
                    )}
                    <Button text="Publier" />
                </form>
            ) : (
                <div className="not-connected">
                    <p>Vous devez être connecté pour laisser un commentaire.</p>
                    <a href="/se-connecter">Se connecter</a>
                </div>
            )}
        </div>
    );
}