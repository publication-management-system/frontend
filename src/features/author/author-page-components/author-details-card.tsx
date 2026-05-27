import React from "react";

import type { AuthorDetailsDto } from "../../../data/authors";

import styles from "./author-details-card.module.css";

interface AuthorDetailsCardProps {
    author: AuthorDetailsDto;
}

export const AuthorDetailsCard = ({ author }: AuthorDetailsCardProps): React.JSX.Element => {
    return (
        <div className={styles.authorDetailsCard}>
            <h2 className={"header-small"}>Author</h2>

            <div className={styles.details}>
                <h1>{author.name}</h1>
                <p className={"body-text"}>
                    <b>Institution</b> {author.institution}
                </p>
                <p className={"body-text"}>
                    <b>Topics</b> {author.topics}
                </p>
            </div>
        </div>
    );
};
