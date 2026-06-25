import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";

import type { ProjectUser } from "../../../data/project";
import { AddProjectUserForm } from "../add-project-user-form/add-project-user-form";

import styles from "./project-user-list.module.css";

export interface PagedUserProjectsProps {
    data: ProjectUser[];
    projectId: string;
}

export default function ProjectUserList({ data, projectId }: PagedUserProjectsProps): React.JSX.Element {
    const [projectUsers, setProjectUsers] = useState<ProjectUser[]>(data);

    return (
        <>
            {data.length === 0 && <p>You have no ongoing projects</p>}
            {data.length > 0 && (
                <div className={styles.container}>
                    <h2 className={"action"}>Users working on this project</h2>

                    <AddProjectUserForm
                        onUserAdded={(newUser: ProjectUser) => {
                            setProjectUsers([...projectUsers, newUser]);
                        }}
                        projectId={projectId}
                    />

                    <div className={styles.projectLineContainer}>
                        {projectUsers.map((pUser: ProjectUser) => (
                            <div key={pUser.id} className={styles.projectLine}>
                                <HiOutlineUserCircle width={32} height={32} />
                                <p className={"action"}>
                                    {pUser.firstName} {pUser.lastName}
                                </p>
                                <p className={"body-small-text"}>{pUser.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
