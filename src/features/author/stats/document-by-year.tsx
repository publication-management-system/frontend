import "chart.js/auto";

import React from "react";
import { Bar } from "react-chartjs-2";

import type { DocumentByYear } from "../../../data/stats";

import styles from "./stats.module.css";

interface Props {
    documentsByYear: DocumentByYear[];
}

export default function DocumentByYear({ documentsByYear }: Props): React.JSX.Element {
    const data = {
        labels: documentsByYear.map((item) => item.year),
        datasets: [
            {
                label: "Documents",
                data: documentsByYear.map((item) => item.documentCount),
                backgroundColor: "hsla(12, 72%, 67%, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    return (
        <div className={styles.chart}>
            <Bar data={data} options={options} />
        </div>
    );
}
