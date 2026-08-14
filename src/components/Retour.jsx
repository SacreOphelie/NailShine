'use client';

import { useRouter } from 'next/navigation';

export default function BoutonRetour({ fallback = '/' }) {
    const router = useRouter();

    const handleClick = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback);
        }
    };

    return (
        <div onClick={handleClick} className="btn-retour">
            <img src="/icones/arrow_filter.png" alt="Retour" className="arrow-icon"/>
            <p>Retour</p>
        </div>
    );
}
