"use client";

import Button from "@/components/Button";
import Input from "@/components/Forms/Input";
import {useState, useEffect} from 'react';
import '@/styles/connexion.scss';
import {supabase} from "@/config/supabase";
import {checkMdp} from "@/config/validation";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RecuperationMdp() {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [erreur, setErreur] = useState({});

    // Gestion du lien qui a expiré
    const [lienInvalide, setLienInvalide] = useState(false);

    useEffect(() => {
        const hash = window.location.hash;
        if(hash && hash.includes("otp_expired")){
            setLienInvalide(true);
            setErreur({
                general: "Le lien de réinitialisation a expiré. Veuillez faire une nouvelle demande de réinitialisation."
            })
        }
    },[]);

    const handleResetPassword = async(e) => {
        e.preventDefault();
        if(lienInvalide) return;

        setErreur({});
        const erreurs = {};

        if(!checkMdp(password))
        {
            erreurs.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
            setErreur(erreurs);
            return;
        }

        try{
            // Mettre à jour le mot de passe de l'utilisateur
            const {error:updateError} = await supabase.auth.updateUser({
                password:password
            });

            if(updateError){
                if(updateError.message.includes("old password"))
                {
                    setErreur({general: "Le nouveau mot de passe est identique à l'ancien."});
                }else if(updateError.message.includes("Auth session missing")){
                    setErreur({general: "Votre session de récupération a expiré ou est invalide. Veuillez refaire une demande de lien."});
                }else{
                    setErreur({general: updateError.message});
                }
            }else{
                // Mise à jour réussie
                toast('Votre mot de passe a bien été modifié', {
                    icon:"🔏",
                    className: 'toast-success',
                    progressClassName: 'toast-progress-bar',
                });
                setPassword('');

                // Forcer la déconnexion 
                await supabase.auth.signOut();

                window.location.href = '/se-connecter';
            }
        }catch{
            setErreur({general: "Une erreur est survenue lors de la réinitialisation du mot de passe."});
        }

    }
    return(
        <>
            <div className="slide" id="recup-mdp">
                <div className="box-connexion">
                    <form onSubmit={handleResetPassword}>
                        {erreur.general && (
                            <p className="error">
                                <TriangleAlert size={20} />
                                {erreur.general}
                            </p>
                        )}
                        <div>
                            <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!erreur.password} />
                            {erreur.password && <div className="error-message"><TriangleAlert size={20}/>{erreur.password}</div>}
                        </div>
                        <div className="btn">
                            <Button text="Réinitialiser mon mot de passe"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}