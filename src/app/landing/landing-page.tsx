import clsx from "clsx";
import React, { useState } from "react";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import type { SearchResults } from "../../data/search";
import { LandingPageSearchResults } from "../../features/landing-page/results/search-results";
import LandingPageSearch from "../../features/landing-page/search/landing-page-search";

import styles from "./landing-page.module.css";

export const LandingPage = (): React.JSX.Element => {
    const [searchResults, setSearchResults] = useState<SearchResults | undefined>();

    return (
        <main className={clsx(styles.landingPage)}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div className={styles.titles}>
                    <h1 className={clsx("heading-medium")}>Publication management platform for citation discovery</h1>
                    <h2 className={clsx("body-text")}>
                        Search, discover, and organize web-sourced citations to support faster and more efficient
                        research workflows.
                    </h2>
                </div>
                <LandingPageSearch
                    onSearchResults={(results) => {
                        setSearchResults(results);
                    }}
                />
                {searchResults && <LandingPageSearchResults searchResults={searchResults} />}
            </section>
        </main>
    );
};
