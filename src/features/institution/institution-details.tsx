import type React from "react";

import type { Institution } from "../../data/institution";

import styles from "./institution-details.module.css";

export function InstitutionDetails({ institution }: { institution: Institution }): React.JSX.Element {
    return (
        <div className={styles.details}>
            <h1 className={"header-small"}>{institution.name}</h1>
            <div className={styles.description}>
                <p className={"body-text"}>
                    <b>Address</b> {institution.address}
                </p>
                <p className={"body-text"}>
                    <b>Email</b> {institution.email}
                </p>
                <p className={"body-text"}>
                    <b>PhoneNumber</b> {institution.phone_number ?? "-"}
                </p>
            </div>
        </div>
    );
}
