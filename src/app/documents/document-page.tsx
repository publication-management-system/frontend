import clsx from "clsx";
import React from "react";
import { useParams } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar";
import { DocumentDetails } from "../../features/document/document-details";

import styles from "./document-page.module.css";

export const DocumentPage = (): React.JSX.Element => {
    const { documentId } = useParams();

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                {documentId && <DocumentDetails documentId={documentId} />}
            </section>
        </main>
    );
};
