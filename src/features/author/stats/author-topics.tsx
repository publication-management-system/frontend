import "chart.js/auto";

import type React from "react";
import { HiOutlineBolt } from "react-icons/hi2";

import styles from "./stats.module.css";

interface Props {
    topics: string[];
}

export default function AuthorTopics({ topics }: Props): React.JSX.Element {
    return (
        <div className={styles.topicsContainer}>
            {topics.map((topic) => (
                <div key={topic} className={styles.topicLine}>
                    <HiOutlineBolt />
                    <p className={"body-text"}>{topic}</p>
                </div>
            ))}
        </div>
    );
}
