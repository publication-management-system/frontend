import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar";
import type { AuthorDetailsDto } from "../../data/authors";
import { getAuthorDetailsById } from "../../features/author/api";
import { AuthorDetailsCard } from "../../features/author/author-page-components/author-details-card";
import { AuthorDocumentsCard } from "../../features/author/author-page-components/author-documents.card";
import AuthorStatsCard from "../../features/author/author-page-components/author-stats-card";

import styles from "./author-page.module.css";

interface AuthorPageState {
    isLoading: boolean;
    author?: AuthorDetailsDto;
}

export const AuthorPage = (): React.JSX.Element => {
    const { authorId } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState<AuthorPageState>({ isLoading: true });

    useEffect(() => {
        if (!authorId) {
            navigate("/not-found");
            return;
        }

        getAuthorDetailsById(authorId)
            .then((author) => {
                setState({ isLoading: false, author });
            })
            .catch(() => navigate("/not-found"));
    }, [authorId]);

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div className={styles.leftSide}>
                    {state.author && (
                        <>
                            <AuthorDetailsCard author={state.author} />
                            <AuthorDocumentsCard authorId={state.author.id} />
                        </>
                    )}
                </div>

                <div className={styles.rightSide}>
                    <AuthorStatsCard authorId={authorId!} />
                </div>
            </section>
        </main>
    );
};
