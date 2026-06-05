/* eslint-disable @next/next/no-img-element */
import '@/styles/cardRealisation.scss';
import Link from 'next/link';

export default function CardRealisation({ idRea = "#" }) {
  return (
    <>
        <Link href={idRea} className="cardRea">
            <div className="favoris">
              <p>Mettre en favoris</p>
              <img src="/icones/Icon_heart.png" alt="Favoris" />
            </div>
            <div className="dateRea">
                <p>Date</p>
            </div>
        </Link>
    </>
  );
}