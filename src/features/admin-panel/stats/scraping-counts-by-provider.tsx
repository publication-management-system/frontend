import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

import type { ScrapingCountsByProvider } from "../../../data/stats";

import styles from "./scraping-stats.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
interface Props {
    stats: ScrapingCountsByProvider[];
}

export const ScrapingCountsByProviderStats = ({ stats }: Props): React.JSX.Element => {
    const labels = stats.map((s) => s.provider);

    const data = {
        labels,
        datasets: [
            {
                label: "Scraped by provider",
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
            <h3 className={"header-extra-small"}>Data by provider</h3>
            <Bar data={data} options={options} />
        </div>
    );
};
