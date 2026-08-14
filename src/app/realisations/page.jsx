import '@/styles/realisationsAll.scss';
import CardRea from "@/components/Realisations/CardRea";
import {supabase} from "@/config/supabase";

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
            <div className="wrapper container">
                <h2>Réalisations</h2>
                <div className="container-rea">
                    <CardRea realisations={realisations} />
                </div>
            </div>
        </div>
    );
}