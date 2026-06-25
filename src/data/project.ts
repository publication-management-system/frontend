export interface Project {
    id: string;
    title: string;
    description: string;
    userDtoList: ProjectUser[];
    projectOwner: ProjectUser;
    createdAt: string;
}

export interface ProjectUser {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    userRole: string;
    imageUrl: string | null;
}

export interface CreateNewProjectDto {
    title: string;
    description: string;
}

export interface PagedProject {
    loading: boolean;
    entities: Project[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
}

export type TaskState = "ToDo" | "InProgress" | "Done" | "Backlog";

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

export interface CreateNewTaskDto {
    title: string;
    description: string;
}

export interface AddUserToProjectDto {
    email: string;
    projectId: string;
}

export interface CreateTaskResourceDto {
    resourceName: string;
    data?: string;
    resourceType: string;
    url?: string;
}

export interface UpdateTaskResourceDto {
    resourceName: string;
    data?: string;
    url?: string;
}

export interface TaskResource {
    id: string;
    resourceName: string;
    resourceType: string;
    data: string;
    url: string;
}

export interface TaskWithResources {
    id: string;
    state: TaskState;
    title: string;
    description: string;
    projectId: string;
    taskResources: TaskResource[];
}
