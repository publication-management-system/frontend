import React from "react";
import './pageable.css'

interface PageableProps {
    pageNumber: number,
    totalPages: number
    onPageChange: (pageNumber: number) => void
}

export const Pageable = ({pageNumber, totalPages, onPageChange}: PageableProps): React.JSX.Element => {

    const isLastPage = pageNumber === (totalPages - 1) || totalPages === 0;
    const isFirstPage = pageNumber === 0;

    const prevPage = () => {
        if (!isFirstPage) {
            onPageChange(pageNumber - 1);
        }
    }

    const nextPage = () => {
        if (!isLastPage) {
            onPageChange(pageNumber + 1);
        }
    }

    return (
        <div className={'pageable'}>
            <div className={`page-button ${isFirstPage ? 'page-button-disabled':''}`} onClick={prevPage}>
                <span>Prev</span>
            </div>

            <div className={'page-count'}>
                {
                    totalPages > 0 && <span>{pageNumber + 1}/{totalPages}</span>
                }

                {totalPages === 0 && <span>No pages found</span>}
            </div>

            <div className={`page-button ${isLastPage ? 'page-button-disabled':''}`} onClick={nextPage}>
                <span>Next</span>
            </div>
        </div>
    )
}