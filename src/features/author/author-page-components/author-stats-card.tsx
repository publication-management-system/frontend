import clsx from "clsx";
import React, { useEffect, useState } from "react";

import type { AuthorStatistics } from "../../../data/stats";
import { getAuthorStatistics } from "../api";
import AuthorTopics from "../stats/author-topics";
import CitationsByYear from "../stats/citations-by-year";
import DocumentByYear from "../stats/document-by-year";

import styles from "./author-stats-card.module.css";

interface Props {
    authorId: string;
}

interface State {
    isLoading: boolean;
    stats?: AuthorStatistics;
}

export default function AuthorStatsCard({ authorId }: Props): React.JSX.Element {
    const [state, setState] = useState<State>({ isLoading: true });

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const stats = await getAuthorStatistics(authorId);

                setState({
                    isLoading: false,
                    stats,
                });
            } catch (e) {
                console.error("Could not get stats", e);

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                }));
            }
        };

        fetchStatistics();
    }, [authorId]);

    return (
        <>
            {state.isLoading && <div className={clsx(styles.statsContainerLoading, "loading_bg_skeleton")}></div>}
            {!state.isLoading && state.stats && (
                <div className={styles.statsContainer}>
                    <h4 className={"subtitle"}>Documents by year</h4>
                    <DocumentByYear documentsByYear={state.stats.documentsByYear} />

                    <h4 className={"subtitle"}>
                        Citations <span className={"text-gray"}>{state.stats.totalNumberOfCitations}</span>
                    </h4>
                    <CitationsByYear citationsByYear={state.stats.citationsByYear} />

                    <h4 className={"subtitle"}>Topics</h4>
                    <AuthorTopics topics={state.stats.topics} />
                </div>
            )}
        </>
    );
}
