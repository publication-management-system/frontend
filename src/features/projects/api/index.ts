import { authenticatedClient } from "../../../data/client";
import type {
    AddUserToProjectDto,
    CreateNewProjectDto,
    CreateNewTaskDto,
    CreateTaskResourceDto,
    Project,
    ProjectUser,
    Task,
    TaskResource,
    TaskWithResources,
    UpdateTaskResourceDto,
} from "../../../data/project";

export const createNewProject = async (data: CreateNewProjectDto, userId: string): Promise<Project> => {
    return authenticatedClient
        .post<Project>(
            "/api/projects",
            { ...data },
            {
                params: {
                    userId,
                },
            },
        )
        .then((response) => response.data);
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
    return await authenticatedClient.get<Project[]>(`/api/projects/user/${userId}`).then((response) => response.data);
};

export const getProjectById = async (userId: string, projectId: string): Promise<Project> => {
    return await authenticatedClient
        .get<Project>(`/api/projects/${projectId}`, {
            params: {
                userId,
            },
        })
        .then((response) => response.data);
};

export const getTasksByProjectId = async (projectId: string): Promise<Task[]> => {
    return await authenticatedClient.get<Task[]>(`/api/tasks/project/${projectId}`).then((response) => response.data);
};

export const createNewTask = async (request: CreateNewTaskDto, projectId: string): Promise<Task> => {
    return await authenticatedClient
        .post<Task>(`/api/tasks/${projectId}`, { ...request })
        .then((response) => response.data);
};

export const updateTaskStatus = async (taskId: string, newState: string): Promise<Task> => {
    return await authenticatedClient
        .patch<Task>(`/api/tasks/${taskId}/state?taskState=${newState}`, {})
        .then((response) => response.data);
};

export const addProjectUser = async (addUserToProject: AddUserToProjectDto): Promise<ProjectUser> => {
    return await authenticatedClient
        .post<ProjectUser>(`/api/projects/add-user`, { ...addUserToProject })
        .then((response) => response.data);
};

export const getTaskWithResourcesForUser = async (
    userId: string,
    projectId: string,
    taskId: string,
): Promise<TaskWithResources> => {
    return await authenticatedClient
        .get<TaskWithResources>(`/api/tasks/with-resources/${taskId}`, {
            params: {
                userId,
                projectId,
            },
        })
        .then((response) => response.data);
};

export const saveTaskResource = async (taskId: string, request: CreateTaskResourceDto): Promise<TaskResource> => {
    return await authenticatedClient
        .post<TaskResource>(`/api/tasks/${taskId}/resources`, { ...request })
        .then((response) => response.data);
};

export const updateTaskResource = async (
    taskId: string,
    resourceId: string,
    request: UpdateTaskResourceDto,
): Promise<TaskResource> => {
    return await authenticatedClient
        .patch<TaskResource>(`/api/tasks/${taskId}/resources/${resourceId}`, { ...request })
        .then((response) => response.data);
};
