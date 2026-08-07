"use client";

/* eslint-disable @next/next/no-img-element */
import '@/styles/add-rea.scss';
import { useAuth } from '@/config/Auth';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {supabase} from '@/config/supabase';
import Input from '@/components/Forms/Input';
import Select from '@/components/Forms/Select';
import Textarea from '@/components/Forms/Textarea';
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
    // State date
    const [date, setDate] = useState('');
    // State saison
    const [saison, setSaison] = useState('');
    // State couleur
    const [couleur, setCouleur] = useState('');
    // State titre
    const [titre, setTitre] = useState('');
    // State description
    const [description, setDescription] = useState('');
    // State du fichier
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const saisons =[
        {id:"printemps", nom:"Printemps"},
        {id:"été", nom:"Été"},
        {id:"automne", nom:"Automne"},
        {id:"hiver", nom:"Hiver"}
    ]
    const couleurs =[
        {id:"rouge", nom:"Rouge"},
        {id:"rose", nom:"Rose"},
        {id:"violet", nom:"Violet"},
        {id:"bleu", nom:"Bleu"},
        {id:"vert", nom:"Vert"},
        {id:"jaune", nom:"Jaune"},
        {id:"orange", nom:"Orange"},
        {id:"blanc", nom:"Blanc"},
        {id:"noir", nom:"Noir"},
        {id:"argent", nom:"Argent"},
        {id:"or", nom:"Or"},
        {id:"multicolore", nom:"Multicolore"}
    ]

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
        const fetchData = async () => {
            try{
                const[techniquesResponse, clientResponse] = await Promise.all([
                    supabase.from('techniques').select('*'),
                    supabase.from('clients').select('*')
                ]);

                // Gestion des techniques
                if(techniquesResponse.error){
                    console.error("Erreur techniques :", techniquesResponse.error);
                }else if(techniquesResponse.data){
                    setTechniques(techniquesResponse.data);
                }

                // Gestion des clients
                if(clientResponse.error){
                    console.error("Erreur clients :", clientResponse.error);
                }else if(clientResponse.data){
                    setClients(clientResponse.data);
                }


            }catch (error){
                console.error("Erreur système", error)
            }
        };

        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur({});
        const erreurs = {};

        if(!techniqueId){
            erreurs.techniqueId = "Veuillez sélectionner une technique.";
        }
        if(!clientId){
            erreurs.clientId = "Veuillez sélectionner un client.";
        }
        if(!date){
            erreurs.date = "Veuillez sélectionner une date.";
        }
        if(!saison){
            erreurs.saison = "Veuillez sélectionner une saison.";
        }
        if(!couleur){
            erreurs.couleur = "Veuillez sélectionner une couleur.";
        }
        if(!file){
            erreurs.file = "Veuillez sélectionner un fichier.";
        }

        //Si l'objet contient au moins une erreur, on affiche tout et on stoppe l'envoi
        if (Object.keys(erreurs).length > 0) {
            setErreur(erreurs);
            return;
        }
        try{
            const {data,error} = await supabase
                .from('réalisations')
                .insert([
                    {
                        client_id: clientId,
                        technique_id: techniqueId,
                        date: date,
                        saison: saison,
                        couleur: couleur,
                        titre: titre,
                        description: description,
                    }
                ]);
                if(error){
                    console.error("Erreur lors de l'ajout de la réalisation :", error);
                }else{
                    // Succès 
                    console.log("Réalisation ajoutée avec succès :", data);
                    // Réinitialiser le formulaire
                    setTechniqueId('');
                    setClientId('');
                    setDate('');
                    setSaison('');
                    setCouleur('');
                    setTitre('');
                    setDescription('');
                }    
        }catch(error){
            console.error("Erreur système lors de l'ajout de la réalisation :", error);
        };
        // console.log(" Technique ID :", techniqueId);
        // console.log(" Client ID :", clientId);
        // console.log(" Date :", date);
        // console.log(" Saison :", saison);
        // console.log(" Couleur :", couleur);
        // console.log(" Titre :", titre);
        // console.log(" Description :", description);
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
                    <div className="row">
                        <div className="client">
                                <Select nomSelect="Client" options={clients} value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Client" 
                            error={!!erreur.clientId}
                            />
                            {erreur.clientId && <div className="error-message"><TriangleAlert size={20}/>{erreur.clientId}</div>}
                        </div>
                        <div className="technique">
                            <Select nomSelect="Technique" options={techniquesPrincipales} value={techniqueId} onChange={(e) => setTechniqueId(e.target.value)} placeholder="Technique" 
                            error={!!erreur.techniqueId}
                            />
                            {erreur.techniqueId && <div className="error-message"><TriangleAlert size={20}/>{erreur.techniqueId}</div>}
                        </div>
                    </div>
                    <div className="date">
                        <Input type="date" placeholder="Date de la réalisation" value={date} onChange={(e) => setDate(e.target.value)} error={!!erreur.date} />
                        {erreur.date && <div className="error-message"><TriangleAlert size={20}/>{erreur.date}</div>}
                    </div>
                    <div className="row">
                        <div className="saison">
                            <Select nomSelect="Saison" options={saisons} value={saison} onChange={(e) => setSaison(e.target.value)} placeholder="Saison" />
                        </div>
                        <div className="couleur">
                            <Select nomSelect="Couleur" options={couleurs} value={couleur} onChange={(e) => setCouleur(e.target.value)} placeholder="Couleur" />
                        </div>
                    </div>
                    <div className="titre">
                        <Input type="text" placeholder="Titre de la réalisation" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    <div className="description">
                        <Textarea placeholder="Description de la réalisation" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="btn">
                        <Button text="Ajouter"/>
                    </div>
                </form>
            </div> 
        </div>
    );
}