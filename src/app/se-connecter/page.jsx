"use client";

import '@/styles/connexion.scss';
import Link from 'next/link';
import {supabase} from "@/config/supabase";
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import {checkEmail} from '@/config/validation';
import { TriangleAlert } from 'lucide-react';

export default function PageConnexion() {
    const router = useRouter();

    // Informations du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [erreur, setErreur] = useState({});

    const handleLogin = async(e) =>{
        e.preventDefault();
        setErreur({});

        // Gestions des erreurs éventuelles
        const erreurs = {};

        // Validation de l'email
        if(!checkEmail(email))
        {
            erreurs.email = "Veuillez entrer un email valide.";
        }

        // vérifier si le mot de passe est vide
        if(!password)
        {
            erreurs.password = "Veuillez entrer votre mot de passe.";
        }

        // Si des erreurs sont présentes, les afficher et empêcher la soumission du formulaire
        if(Object.keys(erreurs).length > 0)
        {
            setErreur(erreurs);
            return;
        }

        try{
            const {data, error: authError} = await supabase.auth.signInWithPassword({
                email:email,
                password:password,
            });
            if(authError){
                // Vérifier les identifiants et afficher un message d'erreur
                if(authError.message.includes("Invalid login credentials"))
                {
                    setErreur({general: "Email ou mot de passe incorrect."});
                }else{
                    setErreur({general: authError.message});
                }
                return;
            }

            // Connexion réussie => redirection vers la page de compte
            router.push('/compte');
            router.refresh(); 
        }catch (error){
            setErreur({ general: error.message || "Une erreur est survenue lors de la connexion." });
        }
    }
    return(
        <>
            <div className="slide" id="connexion">
                <div className="box-connexion">
                    <div className="no-compte">
                        <p>C'est votre première visite ?</p>
                        <Link className='underline' href="/creer-mon-compte">Créer un compte</Link>
                    </div>
                    <form onSubmit={handleLogin}>
                        {erreur.general && <p className="error"><TriangleAlert size={20}/>{erreur.general}</p>}
                        <div>
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!erreur.email} />
                            {erreur.email && <div className="error-message"><TriangleAlert size={20}/>{erreur.email}</div>}
                        </div>
                        <div>
                            <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!erreur.password} />
                            {erreur.password && <span className="error-message"><TriangleAlert size={20}/>{erreur.password}</span>}
                        </div>
                        <div className="btn-crea">
                            <Button text="Se connecter"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}