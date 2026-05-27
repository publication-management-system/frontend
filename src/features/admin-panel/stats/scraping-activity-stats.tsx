import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

import type { ScrapingItemByMinute } from "../../../data/stats";

import styles from "./scraping-activity-stats.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
    stats: ScrapingItemByMinute[];
}

export const ScrapingActivityStats = ({ stats }: Props): React.JSX.Element => {
    const labels = stats.map((s) =>
        new Date(s.minute).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    );

    const data = {
        labels,
        datasets: [
            {
                label: "Scraped per minute",
                data: stats.map((s) => s.count),
                borderColor: "hsla(12, 72%, 67%, 1)",
                backgroundColor: "hsla(12, 72%, 60%, 0.2)",
                tension: 0.3,
                pointRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className={styles.statsContainer}>
            <h3 className={"header-extra-small"}>
                Scraping activity <span className={"text-gray"}>(last 10 minutes)</span>
            </h3>
            <Line data={data} options={options} />
        </div>
    );
};
