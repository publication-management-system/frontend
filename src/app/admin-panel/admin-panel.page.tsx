import clsx from "clsx";
import React from "react";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import { AdminPanelActions } from "../../features/admin-panel/admin-panel-actions";
import { AdminPanelStats } from "../../features/admin-panel/admin-panel-stats";

import styles from "./admin-panel.module.css";

export const AdminPanelPage = (): React.JSX.Element => {
    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div>
                    <h1 className={"header-small"}>Administrative panel</h1>
                    <p className={"body-text text-gray"}>Manage and monitor all publication activities.</p>
                </div>

                <AdminPanelActions />

                <AdminPanelStats />
            </section>
        </main>
    );
};
