/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function Pagination({ items = [], itemsPerPage = 9, children }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    // faire apparaitre la pagination seulement si le nombre d'éléments est supérieur au nombre d'éléments par page
    const showPagination = items.length > itemsPerPage;

    // Calculer les éléments à afficher pour la page actuelle
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = showPagination
        ? items.slice(start, start + itemsPerPage)
        : items;

    // Fonctions pour naviguer entre les pages
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
            {children(currentItems)}
            {showPagination && (
                <div className="pagination">
                    <div className="pagination_container">
                        {currentPage > 1 && (
                            <div className="page_arrow left" onClick={goToPreviousPage}>
                                <img src="/icones/arrow_filter.png" alt="page précédente" />
                            </div>
                        )}
                        <p>{currentPage}</p>
                        {currentPage < totalPages && (
                            <div className="page_arrow right" onClick={goToNextPage}>
                                <img src="/icones/arrow_filter.png" alt="page suivante" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}