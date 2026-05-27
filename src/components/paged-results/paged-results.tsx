import React from "react";
import { Link } from "react-router-dom";

import styles from "./paged-results.module.css";

interface PageComponentProps {
    children: React.ReactNode;
    pageNumber: number;
    totalPages: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    title?: string;
}

export default function PagedResults({
    children,
    pageNumber,
    totalPages,
    onNextPage,
    onPrevPage,
    title,
}: PageComponentProps): React.JSX.Element {
    return (
        <div className={styles.resPageContainer}>
            {title && <h3 className="subtitle">{title}</h3>}

            {children}

            <div className={styles.resPageContainerActions}>
                {pageNumber > 1 && (
                    <Link to="#" onClick={onPrevPage}>
                        Previous
                    </Link>
                )}

                <p>
                    {pageNumber} / {totalPages}
                </p>

                {pageNumber < totalPages && (
                    <Link to="#" onClick={onNextPage}>
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
