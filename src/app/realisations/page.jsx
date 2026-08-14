/* eslint-disable @next/next/no-img-element */
import '@/styles/realisationsAll.scss';
import {supabase} from "@/config/supabase";
import RealisationsList from "@/components/Realisations/realisationList";

// Supabase : récupérer les données de la table "realisations"
  const {data: realisations, error: errorRealisations} = await supabase
    .from('realisations')
    .select('*');
  if (errorRealisations) {
    console.error("Erreur lors de la récupération des réalisations :", errorRealisations);
  }

export default function Realisations() 
{
    return(
        <div className="slide" id="realisationsAll">
            <svg id="svg-1" xmlns="http://www.w3.org/2000/svg" viewBox="500 0 900 1080">
                <path d="M970.64,26.35l20.74,1.5c152.71,15.51,270.65,153.74,330.74,285.02,17,37.14,25.88,75.28,34.25,115.19,9.68,46.18,17.56,95.5,18.14,142.78.01.84-.32,2.22.51,2.74v30.49c-.96,3.2-.44,7.1-.5,10.49-1.57,88.5-34.14,173.85-101.73,231.87-93.52,80.28-217.78,93.43-328.26,137.07-25.34,10.01-43.32,21.2-66.52,34.44-45.65,26.06-97.97,39.2-150.79,34.9-92.93-7.57-161.5-66.69-178.21-158.91-6.8-37.52-4.39-78.28,2.91-115.56,6.86-35.04,19.69-68.14,26.61-103.33,11.99-61.03,11.43-121.38,6.23-183.17-6.51-77.4-22.74-158.29,5.63-233.26,25.78-68.14,85.26-117.91,145.37-155.51,63.99-40.03,135.59-74.18,212.68-76.23l1.21-.52h20.99Z"/>
            </svg>
            <svg id="svg-2" xmlns="http://www.w3.org/2000/svg" viewBox="500 0 900 1080">
                <path d="M970.64,26.35l20.74,1.5c152.71,15.51,270.65,153.74,330.74,285.02,17,37.14,25.88,75.28,34.25,115.19,9.68,46.18,17.56,95.5,18.14,142.78.01.84-.32,2.22.51,2.74v30.49c-.96,3.2-.44,7.1-.5,10.49-1.57,88.5-34.14,173.85-101.73,231.87-93.52,80.28-217.78,93.43-328.26,137.07-25.34,10.01-43.32,21.2-66.52,34.44-45.65,26.06-97.97,39.2-150.79,34.9-92.93-7.57-161.5-66.69-178.21-158.91-6.8-37.52-4.39-78.28,2.91-115.56,6.86-35.04,19.69-68.14,26.61-103.33,11.99-61.03,11.43-121.38,6.23-183.17-6.51-77.4-22.74-158.29,5.63-233.26,25.78-68.14,85.26-117.91,145.37-155.51,63.99-40.03,135.59-74.18,212.68-76.23l1.21-.52h20.99Z"/>
            </svg>
            <div className="wrapper container">
                <h2>Réalisations</h2>
                <RealisationsList realisations={realisations} />
            </div>
        </div>
    );
}