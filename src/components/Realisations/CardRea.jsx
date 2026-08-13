/* eslint-disable @next/next/no-img-element */
import '@/styles/cardRealisation.scss';
import Link from 'next/link';

export default function CardRealisation({realisations }) {

  // Modifier le format de la date (JJ/MM/AAAA)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <>
      {realisations?.map((item) =>(
          <Link href={`/realisation/${item.id}`} className="cardRea" key={item.id} style={{ backgroundImage: `url(${item.image_url})` }}>
              <div className="favoris">
                <p>Mettre en favoris</p>
                <img src="/icones/Icon_heart.png" alt="Favoris" />
              </div>
              <div className="dateRea">
                  <p>{formatDate(item.date)}</p>
              </div>
          </Link>
      ))}
    </>
  );
}