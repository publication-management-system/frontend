import { useEffect, useState } from "react";

import { getUserInfo } from "../../data/accesstokenutil";
import type { ScrapingStatsDto } from "../../data/stats";

import { ScrapingActivityStats } from "./stats/scraping-activity-stats";
import { ScrapingCountsByProviderStats } from "./stats/scraping-counts-by-provider";
import { getScrapingStats } from "./api";

import styles from "./admin-panel-stats.module.css";

export const AdminPanelStats = (): React.JSX.Element => {
    const { accessToken } = getUserInfo();
    const [stats, setStats] = useState<ScrapingStatsDto | undefined>();

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        let cancelled = false;

        const load = async () => {
            try {
                const data = await getScrapingStats(accessToken);

                if (!cancelled) {
                    setStats(data);
                }
            } catch (e) {
                console.error("Failed to load scraping stats", e);
            }

            if (!cancelled) {
                timeoutId = setTimeout(load, 30000);
            }
        };

        load();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={styles.statsContainer}>
            {stats && (
                <>
                    <ScrapingCountsByProviderStats stats={stats.scrapingCountsByProvider} />
                    <ScrapingActivityStats stats={stats.lastTenMinutes} />{" "}
                </>
            )}
        </div>
    );
};
