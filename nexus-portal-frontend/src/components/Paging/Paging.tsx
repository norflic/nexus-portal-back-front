import { useState } from "react";

interface PagingProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

export default function Paging({
    totalItems,
    itemsPerPage,
    onPageChange,
}: PagingProps) {
    if (!totalItems || !itemsPerPage || !onPageChange) {
        return (
            // TODO : faire un composant d'erreur réutilisable
            <div className="border border-red-500 p-4 text-red-500">
                Erreur : Données manquantes pour afficher la pagination
            </div>
        );
    }

    const [pageNumber, setPageNumber] = useState<number>(1);
    const maxPage = Math.ceil(totalItems / itemsPerPage);

    function previousPage() {
        if (pageNumber <= 1) return;
        const newPage = pageNumber - 1;
        setPageNumber(newPage);
        onPageChange(newPage);
    }

    function nextPage() {
        if (pageNumber >= maxPage) return;
        const newPage = pageNumber + 1;
        setPageNumber(newPage);
        onPageChange(newPage);
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            {" "}
            {/* pagination */}
            <button
                data-testid="previous-page-button"
                onClick={previousPage}
                className="pl-0.5 pr-0.5 border rounded hover:bg-gray-100 min-w-2"
            >
                &lt;
            </button>
            <div data-testid="page-info">
                page {pageNumber} / {maxPage}
            </div>
            <button
                data-testid="next-page-button"
                onClick={nextPage}
                className="pl-0.5 pr-0.5 border rounded hover:bg-gray-100 min-w-2"
            >
                &gt;
            </button>
        </div>
    );
}
