import clsx from "clsx";
import React, { useState } from "react";

import NavigationBar from "../../components/navigation/navigation-bar";
import AuthorPreview from "../../features/author/authors-page-components/author-preview";
import { PageAuthors } from "../../features/author/authors-page-components/page-authors";

import styles from "./authors-page.module.css";

export const AuthorsPage = (): React.JSX.Element => {
    const [authorPreviewId, setAuthorPreviewId] = useState<string | undefined>();

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div className={styles.leftSide}>
                    <div className={styles.titles}>
                        <h1 className={clsx("heading-medium")}>Authors Directory</h1>
                        <h2 className={clsx("body-text")}>Explore Scholars, Researchers, and Contributors</h2>
                    </div>

                    <div className={styles.authors}>
                        <PageAuthors
                            onAuthorClicked={(authorId) => {
                                setAuthorPreviewId(authorId);
                            }}
                        />
                    </div>
                </div>

                <div className={styles.rightSide}>
                    {authorPreviewId && <AuthorPreview authorId={authorPreviewId} />}
                </div>
            </section>
        </main>
    );
};
