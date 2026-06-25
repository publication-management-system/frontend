import React from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import type { Project } from "../../../data/project";

import styles from "./user-projects-container.module.css";

export interface PagedUserProjectsProps {
    data: Project[];
}

export default function UserProjectsContainer({ data }: PagedUserProjectsProps): React.JSX.Element {
    return (
        <>
            {data.length === 0 && <p>You have no ongoing projects</p>}
            {data.length > 0 && (
                <div className={styles.container}>
                    <h2 className={"action"}>Ongoing projects</h2>

                    <div className={styles.projectLineContainer}>
                        {data.map((project: Project) => (
                            <a href={`/projects/${project.id}`} key={project.id} className={styles.projectLine}>
                                <HiOutlineBuildingOffice2 width={24} height={24} />
                                <p className={"action"}>{project.title}</p>
                                <p className={"body-small-text"}>{project.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
