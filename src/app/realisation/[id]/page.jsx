
/* eslint-disable @next/next/no-img-element */
import {supabase} from "@/config/supabase";
import '@/styles/realisationPage.scss';
import Button from "@/components/Button";
import Retour from "@/components/Retour";

export default async function RealisationPage({params}) {
    const {id} = await params;

     // Supabase : récupérer les données de la realisation
      const {data: realisation, error} = await supabase
        .from('realisations')
        .select('*, techniques(nom)')
        .eq('id', id)
        .single();
      if (error || !realisation) {
        return(
            <div className="slide">Pas de réalisation trouvée</div>
        )
      }
      // Modifier le format de la date (JJ/MM/AAAA)
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
      };

      // Mettre une majuscule à la première lettre
      const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

  return (
    <>
      <div className="slide" id="realisationPage">
        <div className="btn-retour wrapper">
          <Retour fallback="/realisations" />
        </div>
        <div className="container wrapper">
            <div className="left" style={{ backgroundImage: `url(${realisation.image_url})` }}>
              <div className="favoris">
                <p>Mettre en favoris</p>
                <img src="/icones/Icon_heart.png" alt="Favoris" />
              </div>
            </div>
            <div className="right">
                <h2>
                  {realisation.techniques?.nom}
                  {realisation.nail_art ? ' & ' + capitalize('nail art') : ''}
                </h2>
                <div className="date mini-box">{formatDate(realisation.date)}</div>
                <div className="container-details">
                  <div className={`saison mini-box saison-${realisation.saison}`}>
                    {capitalize(realisation.saison)}
                  </div>
                  <div className={`couleur mini-box couleur-${realisation.couleur}`}>
                    {capitalize(realisation.couleur)}
                  </div>
                </div>
                <div className="texte">
                  <h4>{realisation.titre}</h4>
                  <p>{realisation.description}</p>
                </div>
                <div className="btn">
                  <Button text="Prendre rendez-vous" url="/prendre-rdv" className="button-secondary" />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}