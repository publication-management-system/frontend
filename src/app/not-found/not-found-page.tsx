import clsx from "clsx";
import React from "react";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";

import styles from "./not-found-page.module.css";

export const NotFoundPage = (): React.JSX.Element => {
    return (
        <main className={clsx(styles.landingPage)}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <h1 className={"header-extra-small"}>Page was not found</h1>
            </section>
        </main>
    );
};
