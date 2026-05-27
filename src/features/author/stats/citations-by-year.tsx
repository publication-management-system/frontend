import "chart.js/auto";

import React from "react";
import { Bar } from "react-chartjs-2";

import type { CitationsByYear } from "../../../data/stats";

import styles from "./stats.module.css";

interface Props {
    citationsByYear: CitationsByYear[];
}

export default function CitationsByYear({ citationsByYear }: Props): React.JSX.Element {
    const data = {
        labels: citationsByYear.map((item) => item.year),
        datasets: [
            {
                label: "Citations",
                data: citationsByYear.map((item) => item.citationsCount),
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
