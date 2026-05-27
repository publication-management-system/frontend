import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { CitationDetailsDto } from "../../data/citation";
import type { DocumentDetailsDto } from "../../data/documents";

import { getCitationsByDocumentId, getDocumentDetailsById } from "./api";

import styles from "./document-details.module.css";

interface DocumentDetailsState {
    isLoading: boolean;
    document?: DocumentDetailsDto;
    citations?: CitationDetailsDto[];
}
export const DocumentDetails = ({ documentId }: { documentId: string }): React.JSX.Element => {
    const navigate = useNavigate();
    const [state, setState] = useState<DocumentDetailsState>({ isLoading: true });
    useEffect(() => {
        if (!documentId) {
            navigate("/not-found");
            return;
        }
        getDocumentDetailsById(documentId)
            .then((author) => {
                setState((prev) => ({ ...prev, isLoading: false, document: author }));
            })
            .catch(() => navigate("/not-found"));
        getCitationsByDocumentId(documentId)
            .then((list) => {
                setState((prev) => ({ ...prev, isLoading: false, citations: list }));
            })
            .catch(() => {
                console.error("Could not load citations");
            });
    }, [documentId, navigate]);
    return (
        <div className={styles.documentDetails}>
            {state.isLoading && <p className={"body-small-text text-gray"}>Loading...</p>}
            {state.document && (
                <div className={styles.docInfo}>
                    <div>
                        <h1 className={"header-small"}>{state.document.title}</h1>
                        <h2 className={"text-gray header-extra-small"}>
                            {state.document.publisher} {state.document.volume} {state.document.publicationDate}
                        </h2>
                    </div>
                    <p className={"body-text"}>{state.document.description}</p>
                    {state.document.link && <Link to={state.document.link}>{state.document.link}</Link>}
                    <div className={styles.citationsContainer}>
                        {state.citations?.map((c, i) => (
                            <React.Fragment key={i}>
                                <p className={"body-text"}>{c.title}</p>
                                <p className={"body-small-text"}>{c.link}</p>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
