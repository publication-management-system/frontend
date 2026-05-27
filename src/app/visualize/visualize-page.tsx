import clsx from "clsx";
import React from "react";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import GraphView from "../../features/visualize/graph-view";

import styles from "./visualize-page.module.css";

export const VisualizePage = (): React.JSX.Element => {
    return (
        <main className={clsx(styles.landingPage)}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <GraphView />
            </section>
        </main>
    );
};
