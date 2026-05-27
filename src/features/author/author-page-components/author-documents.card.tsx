import React, { useEffect, useState } from "react";
import { HiOutlineDocument } from "react-icons/hi2";
import { Link } from "react-router-dom";

import PagedResults from "../../../components/paged-results/paged-results";
import type { DocumentDetailsDto } from "../../../data/documents";
import type { PagedResponse } from "../../../data/paged-response";
import { getAuthorDocuments } from "../api";

import styles from "./author-documents.module.css";

interface AuthorDetailsCardProps {
    authorId: string;
}

interface AuthorDocumentsCardState {
    isLoading: boolean;
    documents?: PagedResponse<DocumentDetailsDto>;
    status?: string;
}

interface DocCardData {
    id: string;
    title: string;
    desc?: string;
}

function DocumentCard({ id, title, desc }: DocCardData) {
    const url = `/documents/${id}`;

    return (
        <Link to={url} className={styles.documentCard}>
            <HiOutlineDocument width={24} height={24} />

            <div className={styles.documentCardContents}>
                <h4 className={"body-text"}>{title}</h4>
                {desc && <p className={"body-text-small"}>{desc}</p>}
            </div>
        </Link>
    );
}

export const AuthorDocumentsCard = ({ authorId }: AuthorDetailsCardProps): React.JSX.Element => {
    const [state, setState] = useState<AuthorDocumentsCardState>({
        isLoading: true,
    });

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setPageNumber(1);
    }, [authorId]);

    useEffect(() => {
        let cancelled = false;

        setState((prev) => ({
            ...prev,
            isLoading: true,
            status: undefined,
        }));

        getAuthorDocuments(authorId, pageNumber)
            .then((documents) => {
                console.log(documents);
                if (!cancelled) {
                    setState({
                        isLoading: false,
                        documents,
                    });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setState({
                        isLoading: false,
                        status: "Could not load documents",
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [authorId, pageNumber]);

    return (
        <div className={styles.card}>
            <h2 className="header-small">Documents</h2>

            <div className={styles.details}>
                {state.status && <p>{state.status}</p>}

                {state.documents && (
                    <PagedResults
                        pageNumber={state.documents.pageNumber}
                        totalPages={state.documents.totalPages}
                        onNextPage={() => {
                            setPageNumber((prev) => prev + 1);
                        }}
                        onPrevPage={() => {
                            setPageNumber((prev) => prev - 1);
                        }}
                    >
                        {state.documents.data.map((d) => (
                            <DocumentCard key={d.id} id={d.id} title={d.title} desc={d.publisher} />
                        ))}
                    </PagedResults>
                )}
            </div>
        </div>
    );
};
