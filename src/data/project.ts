export interface Project {
    id: string;
    title: string;
    description: string;
    ownerId: string;
}

export interface PagedProject {
    loading: boolean;
    entities: Project[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
}

export type TaskState = 'ToDo' | 'InProgress' | 'Done' | 'Backlog';

export interface Task {
    id: string;
    state: TaskState;
    title: string;
    description: string;
    projectId: string;
}

export interface ProjectTaskColumn {
    state: TaskState;
    title: string;
}