/* eslint-disable @next/next/no-img-element */
"use client";

import '@/styles/connexion.scss';
import Link from 'next/link';
import {supabase} from "@/config/supabase";
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import { checkString, checkEmail, checkMdp } from '@/config/validation';
import { TriangleAlert } from 'lucide-react';

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

        // Gestions des erreurs grâce aux check de validation ( validation.ts)
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

        // 2. Si l'objet contient au moins une erreur, on affiche tout et on stoppe l'envoi
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
                            email:email,
                            consentement: consentement,
                            role: 'client'
                        }
                    ]);
                if(clientError) throw clientError;

                // Inscription réussie, redirection vers la page de connexion
                router.push('/se-connecter');
            }
        } catch (error){
            setErreur({ general: error.message || "Une erreur est survenue lors de l'inscription." });
        }
    };

    return(
        <>
            <div className="slide" id="create-account">
                <div className="box-connexion">
                    <img src="images/illustrations/etoile.png" alt="etoile" className="illu" id="etoile1"/>
                    <img src="images/illustrations/etoile.png" alt="etoile2" className="illu" id="etoile2"/>
                    <img src="images/illustrations/Rond.png" alt="rond1" className="illu" id="rond1"/>
                    <img src="images/illustrations/Rond.png" alt="rond2" className="illu" id="rond2"/>
                    <div className="no-compte">
                        <p>Vous avez déjà un compte ?</p>
                        <Link href="/se-connecter" className="underline">Se connecter</Link>
                    </div>
                    <form onSubmit={handleRegister}>
                        {erreur.general && <p className="error">{erreur.general}</p>}
                        <div className="group-input">
                            <div>
                                <Input label="Nom" type="text" value={nom} onChange={(e) => setNom(e.target.value)} error={!!erreur.nom} />
                                {erreur.nom && <div className="error-message"><TriangleAlert size={20}/>{erreur.nom}</div>}
                            </div>
                            <div>
                                <Input label="Prénom" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} error={!!erreur.prenom} />
                                {erreur.prenom && <div className="error-message"><TriangleAlert size={20}/>{erreur.prenom}</div>}
                            </div>
                        </div>
                        <div>
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!erreur.email} />
                            {erreur.email && <div className="error-message"><TriangleAlert size={20}/>{erreur.email}</div>}
                        </div>
                        <div>
                            <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!erreur.password} />
                            {erreur.password && <div className="error-message"><TriangleAlert size={20}/>{erreur.password}</div>}
                        </div>
                        <div>
                            <Input label="Je reconnais avoir pris connaissance et accepter les Conditions Générales d’Utilisation et la Politique de Confidentialités" type="checkbox" value={reglement} onChange={(e) => setReglement(e.target.checked)} error={!!erreur.reglement} />
                            {erreur.reglement && <div className="error-message"><TriangleAlert size={20}/>{erreur.reglement}</div>}
                        </div>
                        <Input label="J’accepte que mes prestations futures soit publiées sur le site NailShine (vous pouvez toujours modifier cette option dans votre espace compte plus tard)" type="checkbox" checked={consentement} onChange={(e) => setConsentement(e.target.checked)}  />
                        <div className="btn">
                            <Button text="Créer mon compte"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}