import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavigationBar from "../../components/navigation/navigation-bar";
import { getUserInfo } from "../../data/accesstokenutil";
import type { TaskWithResources } from "../../data/project";
import { getTaskWithResourcesForUser } from "../../features/projects/api";
import TaskDocumentForm from "../../features/projects/task-document-form/task-document-form";

import styles from "./task-page.module.css";

export default function TaskPage(): React.JSX.Element {
    const userInfo = getUserInfo();
    const { projectId, taskId } = useParams();

    const [task, setTask] = useState<TaskWithResources | undefined>(undefined);

    useEffect(() => {
        if (!userInfo.userId || !projectId || !taskId) {
            return;
        }
        const fetchProjectById = async () => {
            const t = await getTaskWithResourcesForUser(userInfo.userId, projectId, taskId);
            setTask(t);
        };

        fetchProjectById();
    }, [userInfo.userId, taskId]);

    return (
        <main className={clsx("page-margin-top", "page-contents")}>
            <NavigationBar />
            <section className={styles.mainSection}>
                {task && (
                    <>
                        <div>
                            <h1 className={"header-small"}>{task.title}</h1>
                            <h2 className={"body-text"}>{task.description}</h2>
                        </div>

                        <TaskDocumentForm
                            taskId={task.id}
                            taskName={task.title}
                            data={task.taskResources.find((t) => t.resourceType === "RICH_TEXT")?.data}
                            resourceId={task.taskResources.find((t) => t.resourceType === "RICH_TEXT")?.id}
                        />
                    </>
                )}
            </section>
        </main>
    );
}
