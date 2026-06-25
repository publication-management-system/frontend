import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import { getUserInfo } from "../../data/accesstokenutil";
import type { Project } from "../../data/project";
import { getProjectById } from "../../features/projects/api";
import { ProjectTasksContainer } from "../../features/projects/project-tasks-container/project-tasks-container";
import ProjectUserList from "../../features/projects/project-user-list/project-user-list";

import styles from "./projects-page.module.css";

export const ProjectPage = (): React.JSX.Element => {
    const userInfo = getUserInfo();
    const { projectId } = useParams();

    const [project, setProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        if (!userInfo.userId || !projectId) {
            return;
        }
        const fetchProjectById = async () => {
            const p = await getProjectById(userInfo.userId, projectId);
            setProject(p);
        };

        fetchProjectById();
    }, [userInfo.userId, projectId]);

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div>
                    {project === undefined && <h1>Loading...</h1>}
                    {project && (
                        <>
                            <h1 className={"header-small"}>{project.title}</h1>
                            <p className={"body-small-text text-gray"}>{project.description}</p>
                        </>
                    )}
                </div>
                {project && <ProjectTasksContainer projectId={project.id} />}

                {project && <ProjectUserList data={project.userDtoList} projectId={project.id} />}
            </section>
        </main>
    );
};
