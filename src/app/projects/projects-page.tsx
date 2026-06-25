import clsx from "clsx";
import React, { useEffect, useState } from "react";

import NavigationBar from "../../components/navigation/navigation-bar.tsx";
import { getUserInfo } from "../../data/accesstokenutil";
import type { Project } from "../../data/project";
import { getUserProjects } from "../../features/projects/api";
import { CreateNewProjectForm } from "../../features/projects/create-project-form/create-new-project-form";
import UserProjectsContainer from "../../features/projects/user-projects-container/user-projects-container";

import styles from "./projects-page.module.css";

export const ProjectsPage = (): React.JSX.Element => {
    const userInfo = getUserInfo();

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (!userInfo.userId) return;
        const fetchProjects = async () => {
            const userProjects = await getUserProjects(userInfo.userId);
            setProjects(userProjects);
        };
        fetchProjects();
    }, [userInfo.userId]);

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                <div>
                    <h1 className={"header-small"}>My projects</h1>
                    <p className={"body-text text-gray"}>View your works, create new or resume work on projects</p>
                </div>

                <CreateNewProjectForm
                    onProjectAdded={(p) => {
                        setProjects([p, ...projects]);
                    }}
                />
                <UserProjectsContainer data={projects} />
            </section>
        </main>
    );
};
