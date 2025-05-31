import {ProjectTaskColumn, Task} from "../../../data/project.ts";
import './projectcolumn.css'
import {useDraggable, useDroppable} from "@dnd-kit/core";
import React from "react";
import {HiArrowsExpand} from "react-icons/hi";

interface ProjectColumnProps {
    column: ProjectTaskColumn
    tasks: Task[],
    onCreateTask: () => void,
    onTaskOpen: (task: Task) => void
}

interface TaskCardProps {
    task: Task
    onTaskOpen: (task: Task) => void
}

const TaskCard = React.memo(({ task, onTaskOpen }: TaskCardProps): React.JSX.Element => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)`, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'}
        : undefined;

    return (
        <div className={'task'} ref={setNodeRef}  {...attributes} key={task.id} style={style}>
            <div className={'task-details'} {...listeners}>
                <h2>{task.title}</h2>
            </div>

            <div className={'task-actions'}>
                <HiArrowsExpand onClick={(e) => {
                    e.stopPropagation();
                    onTaskOpen(task)
                }} />
            </div>
        </div>
    );
});

export const ProjectColumn = ({column, tasks, onCreateTask, onTaskOpen}: ProjectColumnProps): React.JSX.Element => {
    const {setNodeRef} = useDroppable({
        id: column.state
    })

    return (
        <div className={'project-column'} >
            <h2>{column.title}</h2>

            {
                column.state === 'Backlog' && (
                    <div className={'create-task-card'} onClick={onCreateTask}>
                        <p>Create a new task</p>
                    </div>
                )
            }

            <div ref={setNodeRef} className={'task-list'}>
                {tasks.map((task: Task) => (
                    <TaskCard task={task} key={task.id} onTaskOpen={onTaskOpen}/>
                ))}
            </div>
        </div>
    )
}