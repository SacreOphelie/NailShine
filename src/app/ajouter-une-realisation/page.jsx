"use client";

/* eslint-disable @next/next/no-img-element */
import '@/styles/add-rea.scss';
import { useAuth } from '@/config/Auth';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {supabase} from '@/config/supabase';
import Select from '@/components/forms/Select';
// import Input from '@/components/forms/Input';
import Button from '@/components/Button';
import { TriangleAlert } from 'lucide-react';

export default function AddRea()  {
    const{userProfil, isConnected,loading} = useAuth();
    const router = useRouter();

    // State : techniques
    const [techniques, setTechniques] = useState([]);
    const [techniqueId , setTechniqueId] = useState('');
    // State : clients
    const [clients, setClients] = useState([]);
    const [clientId, setClientId] = useState('');

    // Gestion des erreurs de formulaire
     const [erreur, setErreur] = useState({});

    // Gestion de la redirection si l'utilisateur n'est pas connecté ou n'est pas admin
    useEffect(() => {
        if(!loading){
            if(!isConnected || userProfil?.role !== 'admin'){
                router.replace('/');
            }
        }
    }, [loading, isConnected, userProfil?.role, router]);

    // Récupérer les techniques depuis la base de données
    useEffect(() => {
        const fetchTechniques = async () => {
            try{
                const {data, error} = await supabase
                    .from('techniques')
                    .select('*');

                if(error){
                    console.error("Erreur lors de la récupération des techniques :", error);
                }else if (data){
                    setTechniques(data);
                }
            }catch (error){
                console.error("Erreur système", error)
            }
        };

        fetchTechniques();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur({});
        const erreurs = {};

        if(!techniqueId){
            erreurs.techniqueId = "Veuillez sélectionner une technique.";
        }

        //Si l'objet contient au moins une erreur, on affiche tout et on stoppe l'envoi
        if (Object.keys(erreurs).length > 0) {
            setErreur(erreurs);
            return;
        }

        console.log(" Technique ID :", techniqueId);
    }

    const techniquesPrincipales = techniques.filter(technique => !technique.nail_art);

    
    if (loading || !isConnected || userProfil?.role !== 'admin') {
        return (
            <div className="slide"></div>
        );
    }
    return(
        <div className="slide" id="add-rea">
            <div className="box">
                <h2>Ajouter une réalisation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="container-form">
                        <div className="row">
                            <div className="client">
                                
                            </div>
                            <div className="technique">
                                <Select nomSelect="Technique" options={techniquesPrincipales} value={techniqueId} onChange={(e) => setTechniqueId(e.target.value)} placeholder="Choisissez la prestation que vous souhaitez." 
                                error={!!erreur.techniqueId}
                                />
                                {erreur.techniqueId && <div className="error-message"><TriangleAlert size={20}/>{erreur.techniqueId}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <Button text="Ajouter"/>
                    </div>
                </form>
            </div>
        </div>
    );
}