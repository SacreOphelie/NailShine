/* eslint-disable @next/next/no-img-element */
"use client";
import CardRea from "@/components/Realisations/CardRea";
import Pagination from "@/components/Pagination";

// Pour faire la liaison entre le côté serveur et client
export default function RealisationsList({ realisations }) {
    return (
        <Pagination items={realisations} itemsPerPage={9}>
            {(currentItems) => (
                <div className="container-rea">
                    <img src="/images/illustrations/Rond.png" alt="rond1" className="illu" id="rond1" />
                    <img src="/images/illustrations/Rond.png" alt="rond2" className="illu" id="rond2" />
                    <CardRea realisations={currentItems} />
                </div>
            )}
        </Pagination>
    );
}