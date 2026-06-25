import { useDraggable, useDroppable } from "@dnd-kit/core";
import React from "react";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

import type { ProjectTaskColumn, Task } from "../../../data/project";

import styles from "./project-column.module.css";

interface ProjectColumnProps {
    column: ProjectTaskColumn;
    tasks: Task[];
}

interface TaskCardProps {
    task: Task;
}

const TaskCard = React.memo(({ task }: TaskCardProps): React.JSX.Element => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
              maxWidth: "480px",
          }
        : undefined;

    return (
        <div className={styles.task} ref={setNodeRef} {...attributes} key={task.id} style={style}>
            <div className={styles.taskDetails} {...listeners}>
                <h2 className={"action-small"}>{task.title}</h2>
            </div>
            <Link to={`/projects/${task.projectId}/tasks/${task.id}`} className={styles.taskActions}>
                <HiEye
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            </Link>
        </div>
    );
});

export const ProjectColumn = ({ column, tasks }: ProjectColumnProps): React.JSX.Element => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.state,
    });
    return (
        <div className={styles.projectColumn}>
            <h2 className={"action"}>{column.title}</h2>
            <div ref={setNodeRef} className={`${styles.taskList} ${isOver ? styles.taskListOver : ""}`}>
                {tasks.map((task: Task) => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </div>
    );
};
