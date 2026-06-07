"use client";

import '@/styles/connexion.scss';
import Link from 'next/link';
import {supabase} from "@/config/supabase";
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import { checkString, checkEmail, checkMdp } from '@/config/validation';

export default function PageCreateAccount() {

    const router = useRouter();

    // Informations du formulaire 
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [consentement, setConsentement] = useState(true);
    const [reglement, setReglement] = useState(false);

    const [erreur, setErreur] = useState({});

    const handleRegister = async(e) =>{
        e.preventDefault();
        setErreur({});

        const erreurs = {};

        if(!checkString(nom))
        {
            erreurs.nom = "Veuillez entrer un nom valide.";
        }
        if(!checkString(nom))
        {
            erreurs.nom = "Veuillez entrer un nom valide.";
        }

        if(!checkString(prenom))
        {
            erreurs.prenom = "Veuillez entrer un prénom valide.";
        }

        if(!checkEmail(email))
        {
            erreurs.email = "Veuillez entrer un email valide.";
        }

        if(!checkMdp(password))
        {
            erreurs.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
        }

        if(!reglement)
        {
            erreurs.reglement = "Vous devez accepter les conditions de confidentialité.";
        }

        // 2. Si l'objet contient au moins une clé, on affiche tout et on stoppe l'envoi
        if (Object.keys(erreurs).length > 0) {
            setErreur(erreurs);
            return;
        }

        try{
            // Inscription dans le coffre fort de Supabase
            const {data: authData, error: authError} = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            //Gestion d'un mail déjà existant
            if(authError)
            {
                if(authError.message.includes("already registered") || authError.status === 422)
                {
                    setErreur({ email: "Cet email est déjà utilisé."});
                }else{
                    setErreur({general: authError.message});
                }
                return;
            }

            // Récupération de l'ID utilisateur
            if(authData && authData.user)
            {
                const userId = authData.user.id;

                // Insertion des données dans la table clients
                const{ error:clientError} = await supabase
                    .from('clients')
                    .insert([
                        {
                            id: userId,
                            nom: nom,
                            prenom: prenom,
                            consentement: consentement,
                            role: 'client'
                        }
                    ]);
                if(clientError) throw clientError;

                // Inscription réussie, redirection vers la page de connexion
                router.push('/connexion');
            }
        } catch (error){
            setErreur({ general: error.message || "Une erreur est survenue lors de l'inscription." });
        }
    };

    return(
        <>
            <div className="slide" id="about">
                <div className="box-connexion">
                    <p>Vous avez déjà un compte ?
                        <Link href="/connexion">Se connecter</Link>
                    </p>
                    <form onSubmit={handleRegister}>
                        {erreur.general && <p className="error">{erreur.general}</p>}
                        <div className="group-input">
                            <Input label="Nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                            {erreur.nom && <span className="error-message">{erreur.nom}</span>}
                            <Input label="Prénom" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                            {erreur.prenom && <span className="error-message">{erreur.prenom}</span>}
                        </div>
                        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {erreur.email && <span className="error-message">{erreur.email}</span>}
                        <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {erreur.password && <span className="error-message">{erreur.password}</span>}
                        <Input label="J'accepte les conditions de confidentialité" type="checkbox" value={reglement} onChange={(e) => setReglement(e.target.checked)} required/>
                        {erreur.reglement && <span className="error-message">{erreur.reglement}</span>}
                        <Input label="J'accepte de poster mes ongles" type="checkbox" checked={consentement} onChange={(e) => setConsentement(e.target.checked)}  />
                        <div className="btn-crea">
                            <Button text="Créer mon compte"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}