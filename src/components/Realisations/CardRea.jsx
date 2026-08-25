"use client";
/* eslint-disable @next/next/no-img-element */
import '@/styles/cardRealisation.scss';
import Link from 'next/link';
import Favoris from '@/components/Realisations/Favoris';

export default function CardRealisation({realisations, limit }) {

  // Modifier le format de la date (JJ/MM/AAAA)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // ordonnée par date
  const order = realisations?.sort((a, b) => new Date(b.date) - new Date(a.date));

  const limitRealisations = limit ? order.slice(0, limit) : order;

  return (
    <>
      {limitRealisations?.map((item) =>(
          <Link href={`/realisation/${item.id}`} className="cardRea" key={item.id} style={{ backgroundImage: `url(${item.image_url})` }}>
            <Favoris realisationId={item.id} />
              <div className="dateRea">
                  <p>{formatDate(item.date)}</p>
              </div>
          </Link>
      ))}
    </>
  );
}