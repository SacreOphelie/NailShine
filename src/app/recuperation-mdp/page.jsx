"use client";

import Button from "@/components/Button";
import Input from "@/components/Forms/Input";
import {useState} from 'react';
import '@/styles/connexion.scss';
import {supabase} from "@/config/supabase";
import {checkEmail} from "@/config/validation";
import { TriangleAlert } from "lucide-react";
import { Send } from 'lucide-react';

export default function RecuperationMdp() {

    const [email, setEmail] = useState('');
    const [erreur, setErreur] = useState({});
    const [message, setMessage] = useState('');

    const handleRequestReset = async(e) => {
        e.preventDefault();
        setErreur({});
        setMessage('');

        const erreurs = {};

        // Vérifier si l'email est valide
        if(!checkEmail(email))
        {
            erreurs.email = "Veuillez entrer un email valide.";
            setErreur(erreurs);
            return;
        }

        // Vérifier si le mail existe dans la base de données
        try{
            const {data: clientExiste, error:checkError} = await supabase
                .from('clients')
                .select('id')
                .eq('email', email)
                .maybeSingle();
            
            if(checkError) throw checkError;

            if(!clientExiste){
                erreurs.email = "Aucun compte n'est associé à cet email.";
                setErreur(erreurs);
                return;
            }

            // Envoyer le mail de réinitialisation
            const{error: resetError} = await supabase.auth.resetPasswordForEmail(email,{
                redirectTo: `${window.location.origin}/nouveau-mdp`
            })

            if (resetError) {
                if (resetError.message.includes("after")) {
                    setErreur({ 
                        general: "Veuillez patienter une minute avant de faire une nouvelle demande de réinitialisation." 
                    });
                } else {
                    setErreur({ general: resetError.message });
                }
            } else {
                setMessage("Un e-mail de réinitialisation a été envoyé à l'adresse fournie.");
            }
        }catch{
            setErreur({general: "Une erreur est survenue lors de la demande de réinitialisation du mot de passe."});
        }
    };
    return(
        <>
            <div className="slide" id="recup-mdp">
                <div className="box-connexion">
                    {message && (
                        <div className="success-message">
                            <Send size={20} />
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleRequestReset}>
                        {erreur.general && <p className="error"><TriangleAlert size={20}/>{erreur.general}</p>}
                        <div>
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!erreur.email} />
                            {erreur.email && <div className="error-message"><TriangleAlert size={20}/>{erreur.email}</div>}
                        </div>
                        <div className="btn">
                            <Button text="Envoyer le lien de réinitialisation"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}