import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import type { ProjectTaskColumn, Task, TaskState } from "../../../data/project";
import { getTasksByProjectId, updateTaskStatus } from "../api";
import { CreateNewTaskForm } from "../create-new-task-form/create-new-task-form";
import { ProjectColumn } from "../project-column/project-column";

import styles from "./project-tasks-container.module.css";

const columns: ProjectTaskColumn[] = [
    { state: "Backlog", title: "Backlog" },
    { state: "ToDo", title: "To Do" },
    { state: "InProgress", title: "In Progress" },
    { state: "Done", title: "Done" },
];

interface ProjectTasksProps {
    projectId: string;
}

export function ProjectTasksContainer({ projectId }: ProjectTasksProps): React.JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasksForProject = async () => {
            const taskList = await getTasksByProjectId(projectId);
            setTasks(taskList);
        };

        fetchTasksForProject();
    }, [projectId]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const taskId = active.id as TaskState;
        const newState = over.id as Task["state"];

        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, state: newState } : task)));

        updateTaskStatus(taskId, newState);
    };

    return (
        <div className={styles.container}>
            <CreateNewTaskForm
                projectId={projectId}
                onTaskAdded={(newTask) => {
                    setTasks([...tasks, newTask]);
                }}
            />

            <DndContext onDragEnd={handleDragEnd}>
                <div className={styles.board}>
                    <div className={styles.columnsRow}>
                        {columns
                            .filter((col) => col.state !== "Backlog")
                            .map((column) => (
                                <ProjectColumn
                                    key={column.state}
                                    column={column}
                                    tasks={tasks.filter((t) => t.state === column.state)}
                                />
                            ))}
                    </div>

                    <div className={styles.backlogRow}>
                        <ProjectColumn column={columns[0]} tasks={tasks.filter((t) => t.state === "Backlog")} />
                    </div>
                </div>
            </DndContext>
        </div>
    );
}
