import React, { useEffect, useState } from "react";
import { HiOutlineDocument } from "react-icons/hi2";

import PagedResults from "../../../components/paged-results/paged-results";
import type { PagedResponse } from "../../../data/paged-response";
import type { AuthorSearchResponse } from "../../../data/search";
import { getAuthorsPaged } from "../api";

import styles from "./page-authors.module.css";

interface Props {
    onAuthorClicked: (authorId: string) => void;
}

interface AuthorsPagedState {
    isLoading: boolean;
    authors?: PagedResponse<AuthorSearchResponse>;
    status?: string;
}

interface AuthorCardData {
    id: string;
    name: string;
    institution?: string;
}

function AuthorCard({ name, institution }: AuthorCardData): React.JSX.Element {
    return (
        <div className={styles.authorCard}>
            <HiOutlineDocument width={24} height={24} />

            <div className={styles.authorCardContents}>
                <h4 className={"body-text"}>{name}</h4>
                {institution && <p className={"body-text-small"}>{institution}</p>}
            </div>
        </div>
    );
}

export const PageAuthors = ({ onAuthorClicked }: Props): React.JSX.Element => {
    const [state, setState] = useState<AuthorsPagedState>({
        isLoading: true,
    });

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setPageNumber(1);
    }, []);

    useEffect(() => {
        let cancelled = false;

        setState((prev) => ({
            ...prev,
            isLoading: true,
            status: undefined,
        }));

        getAuthorsPaged(pageNumber)
            .then((a) => {
                if (!cancelled) {
                    setState({
                        isLoading: false,
                        authors: a,
                    });
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setState({
                        isLoading: false,
                        status: "Could not load authors",
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [pageNumber]);

    return (
        <div className={styles.card}>
            <div className={styles.details}>
                {state.status && <p>{state.status}</p>}

                {state.authors && (
                    <PagedResults
                        pageNumber={state.authors.pageNumber}
                        totalPages={state.authors.totalPages}
                        onNextPage={() => {
                            setPageNumber((prev) => prev + 1);
                        }}
                        onPrevPage={() => {
                            setPageNumber((prev) => prev - 1);
                        }}
                    >
                        {state.authors.data.map((a) => (
                            <div
                                key={a.id}
                                onClick={() => {
                                    onAuthorClicked(a.id);
                                }}
                            >
                                <AuthorCard id={a.id} name={a.name} institution={a.institution} />
                            </div>
                        ))}
                    </PagedResults>
                )}
            </div>
        </div>
    );
};
