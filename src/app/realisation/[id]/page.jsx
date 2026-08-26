
/* eslint-disable @next/next/no-img-element */
import {supabase} from "@/config/supabase";
import '@/styles/realisationPage.scss';
import Button from "@/components/Button";
import Retour from "@/components/Retour";
import { notFound } from 'next/navigation';
import Favoris from "@/components/Realisations/Favoris";
import Commentaire from "@/components/Avis/Commentaire";
import Heart from "@/components/Heart";
export const dynamic = 'force-dynamic';

export default async function RealisationPage({params}) {
    const {id} = await params;

      // Supabase : récupérer les données de la realisation
      const {data: realisation, error} = await supabase
        .from('realisations')
        .select('*, techniques(nom)')
        .eq('id', id)
        .single();
      // Si la realisation n'existe pas, afficher une page 404
      if (error || !realisation) {
              notFound(); 
      }
      // Supabase : récupérer les commentaires liés à la realisation
      const { data: commentaires } = await supabase
          .from('commentaires')
          .select('*, clients(prenom, nom)')
          .eq('realisation_id', id)

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
              <Favoris realisationId={realisation.id} />
            </div>
            <div className="right">
                <h2>
                  {realisation.techniques?.nom}
                  {realisation.nail_art ? ' & ' + capitalize('nail art') : ''}
                </h2>
                <div className="date mini-box">{formatDate(realisation.date)}</div>
                <div className="container-details">
                  {/* Si il y a une saison */}
                  {realisation.saison && (
                    <div className={`saison mini-box saison-${realisation.saison}`}>
                      {capitalize(realisation.saison)}
                    </div>
                  )}
                  {realisation.couleur && (
                    <div className={`couleur mini-box couleur-${realisation.couleur}`}>
                      {capitalize(realisation.couleur)}
                    </div>
                  )}
                </div>
                {realisation.titre && realisation.description && (
                  <div className="texte">
                    <h4>{realisation.titre}</h4>
                    <p>{realisation.description}</p>
                  </div>
                )}
                <div className="btn">
                  <Button text="Prendre rendez-vous" url="/prendre-rdv" className="button-secondary" />
                </div>
            </div>
        </div>
        <div className="container-commentaire wrapper">
            <Commentaire realisationId={realisation.id} />
            <div className="liste-commentaires">
              {commentaires.length === 0 ? (
                <p className="no-commentaire">Aucun commentaire pour le moment.</p>
              ) : (
                commentaires.map((commentaire) => (
                  <div key={commentaire.id} className="div-commentaire">
                      <div className="header">
                        <img src="/images/prothesiste/placeholder_pp.png" alt="placeholder"/>
                        <div className="infos">
                            <div className="avis">
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} className={`note ${n <= commentaire.note ? 'active' : ''}`}><Heart /></div>
                                ))}
                            </div>
                            <p className="auteur">
                                {commentaire.clients?.prenom} {commentaire.clients?.nom.charAt(0)}.
                            </p>
                        </div>
                      </div>
                      <div className="contenu"><p>{commentaire.contenu}</p></div>
                  </div>
              )))}
            </div>
        </div>
      </div>
    </>
  );
}