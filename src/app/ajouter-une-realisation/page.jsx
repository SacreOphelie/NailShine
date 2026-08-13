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
import { TriangleAlert, X } from 'lucide-react';

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

    const [confirmationMessage, setConfirmationMessage] = useState('');

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

    // Gestion du changement de fichier
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }else{
            setFile(null);
            setPreviewUrl(null);
        }
    };

     // Supprimer l'image d'inspiration choisie
    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur({});
        const erreurs = {};

        if(!techniqueId){
            erreurs.techniqueId = "Veuillez sélectionner une technique.";
        }
        if(!date){
            erreurs.date = "Veuillez sélectionner une date.";
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
            // Gestion de l'upload du fichier
            let imageUrl = null;
            if(file){
                // créer un nom de fichier 
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `images/${fileName}`;

                const{error: uploadError} = await supabase.storage
                    .from('realisations')
                    .upload(filePath, file);
                
                if(uploadError){
                    console.error("Erreur lors de l'upload du fichier :", uploadError);
                    setErreur({file : "Erreur lors de l'upload du fichier."});
                    return;
                }

                const{data:publicUrlData} = await supabase.storage
                    .from('realisations')
                    .getPublicUrl(filePath);

                imageUrl = publicUrlData.publicUrl;
            }
            const {data,error} = await supabase
                .from('realisations')
                .insert([
                    {
                        client_id: clientId || null,
                        technique_id: techniqueId,
                        date: date,
                        saison: saison || null,
                        couleur: couleur || null,
                        titre: titre || null,
                        description: description || null,
                        image_url: imageUrl
                    }
                ]);
                if(error){
                    console.error("Erreur lors de l'ajout de la réalisation :", error);
                }else{
                    // Succès 
                    console.log("Réalisation ajoutée avec succès :", data);
                    setConfirmationMessage("Votre réalisation a été ajoutée avec succès !");
                    // Réinitialiser le formulaire
                    setTechniqueId('');
                    setClientId('');
                    setDate('');
                    setSaison('');
                    setCouleur('');
                    setTitre('');
                    setDescription('');
                    setPreviewUrl(null);
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
        // console.log(" Fichier :", imageUrl);
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
                    {confirmationMessage && (   
                        <div className="message">
                            <p>{confirmationMessage}</p>
                        </div>
                    )}
                    <div className="container-file">
                        <div className="file">
                            <Input type="file" onChange={handleFileChange} accept="image/*" id="realisation-file" style={{ display: 'none' }} error={!!erreur.file}/>
                            <label htmlFor="realisation-file" className="btn-realisation">
                                Choisir une image
                            </label>
                            {erreur.file && <div className="error-message"><TriangleAlert size={20}/>{erreur.file}</div>}
                        </div>
                        <p className="italic">jpg/png</p>
                        {previewUrl && (
                            <div className="preview">
                                <img src={previewUrl} alt="Aperçu de la réalisation" className="preview-image"/>
                                <button onClick={removeFile}>
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="client">
                                <Select nomSelect="Client" options={clients} value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Client" />
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