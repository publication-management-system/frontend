import React, {useEffect, useState} from "react";
import './projectpage.css'
import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {Toast, ToastSettings} from "../../../components/toast/toast.tsx";
import {Modal, ModalSettings} from "../../../components/modal/modal.tsx";
import {useParams} from "react-router-dom";
import {Project, ProjectTaskColumn, Task, TaskState} from "../../../data/project.ts";
import {ProjectColumn} from "../../../components/projects/projectcolumn/projectcolumn.tsx";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {authenticatedClient} from "../../../data/client.ts";
import {CreateTaskForm} from "../../../components/projects/createtaskform/createtaskform.tsx";

export const ProjectPage = (): React.JSX.Element => {
    const {projectId} = useParams<{ projectId: string }>();
    const [toastSettings, setToastSettings] = useState<ToastSettings>({open: false, message: '', type: "success"});
    const [modalSettings, setModalSettings] = useState<ModalSettings>({
        bodyComponent: undefined,
        open: false,
        title: ""
    });
    const [project, setProject] = useState<Project>();

    const columns: ProjectTaskColumn[] = [
        {state: 'Backlog', title: 'Backlog'},
        {state: 'ToDo', title: 'To Do'},
        {state: 'InProgress', title: 'In Progress'},
        {state: 'Done', title: 'Done'},
    ]

    const [tasks, setTasks] = useState<Task[]>([]);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over) {
            return;
        }

        const taskId = active.id as TaskState;
        const newState = over.id as Task['state'];

        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? {...task, state: newState} : task
        ));

        authenticatedClient.patch(`/api/tasks/${taskId}/state?taskState=${newState}`);
    }

    const fetchTasks = async () => {
        await authenticatedClient.get(`/api/tasks/project/${projectId}`)
            .then(response => setTasks(response.data))
            .catch((error) => setToastSettings({open: true, message: error, type: "error"}));
    }

    const openModal = (title: string, bodyComponent: React.ReactNode) => {
        setModalSettings({
            open: true,
            title: title,
            bodyComponent: bodyComponent
        });
    };

    const onCreateTask = () => {
        openModal('Create New Task', <CreateTaskForm
            onSuccess={(task) => {
                setModalSettings({...modalSettings, open: false})
                setToastSettings({...toastSettings, open: true, message: "Project created successfully."});
                setTasks([...tasks, task]);
            }}
            onError={(err) => setToastSettings({open: true, message: err, type: "error"})}
            projectId={projectId ?? ''}/>)
    }

    const fetchProject = async () => {
        await authenticatedClient.get(`/api/projects/${projectId}`)
            .then(response => {setProject(response.data)})
            .catch((error) => setToastSettings({open: true, message: error, type: "error"}));
    }

    useEffect(() => {
        fetchTasks();
        fetchProject();
    }, [])

    return (
        <>
            <AuthenticatedLayout>
                <AuthenticatedNavigation/>
                <div className="projects-columns" style={{paddingTop: '8%'}}>
                    <div className={'content'}>
                        <h1>{project?.title ?? 'Loading...'}</h1>
                    </div>
                    <DndContext onDragEnd={handleDragEnd}>
                        <div className={'projects-wrapper content'} >
                            {
                                columns.filter(col => col.state !== 'Backlog').map((column: ProjectTaskColumn) => {
                                    return (
                                        <ProjectColumn key={column.state}
                                                       column={column}
                                                       onCreateTask={onCreateTask}
                                                       tasks={tasks.filter(task => task.state === column.state)}
                                                       onTaskOpen={(task: Task) => console.log(task)}
                                        />
                                    )
                                })
                            }
                        </div>

                        <div className={'projects-backlog content'}>
                            <ProjectColumn key={'Backlog'}
                                           column={columns[0]}
                                           tasks={tasks.filter(task => task.state === 'Backlog')}
                                           onCreateTask={onCreateTask}
                                           onTaskOpen={(task: Task) => console.log(task)}
                            />
                        </div>
                    </DndContext>
                </div>

            </AuthenticatedLayout>
            <Toast open={toastSettings.open}
                   onToastClose={() => {
                       setToastSettings({...toastSettings, open: false})
                   }}
                   message={toastSettings.message}
                   type={toastSettings.type}
            />
            <Modal title={modalSettings.title}
                   open={modalSettings.open}
                   children={modalSettings.bodyComponent}
                   onClose={() => setModalSettings({...modalSettings, open: false})}
            />
        </>
    )
}