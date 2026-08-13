/* eslint-disable @next/next/no-img-element */
import '@/styles/cardRealisation.scss';
import Link from 'next/link';

export default function CardRealisation({realisations }) {
  return (
    <>
      {realisations?.map((item) =>(
          <Link href={`/${item.id}`} className="cardRea" key={item.id}>
              <div className="favoris">
                <p>Mettre en favoris</p>
                <img src="/icones/Icon_heart.png" alt="Favoris" />
              </div>
              <div className="dateRea">
                  <p>{item.date}</p>
              </div>
          </Link>
      ))}
    </>
  );
}