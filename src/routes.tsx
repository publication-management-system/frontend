import { createBrowserRouter } from "react-router-dom";

import { AdminPanelPage } from "./app/admin-panel/admin-panel.page";
import { AuthorPage } from "./app/author/author-page";
import { AuthorsPage } from "./app/authors/authors-page";
import { DocumentPage } from "./app/documents/document-page";
import { InstitutionConfigPage } from "./app/institution-config/institution-config-page";
import { LandingPage } from "./app/landing/landing-page.tsx";
import { LoginPage } from "./app/login/login-page";
import { LogoutPage } from "./app/logout/logoutpage.tsx";
import { NotFoundPage } from "./app/not-found/not-found-page";
import { ProjectPage } from "./app/projects/project-page";
import { ProjectsPage } from "./app/projects/projects-page";
import TaskPage from "./app/projects/task-page";
import { InvitationRegisterPage } from "./app/register/invitation-register-page";
import { RegisterPage } from "./app/register/register-page";
import { VisualizePage } from "./app/visualize/visualize-page";
import { ProtectedRoutes } from "./components/protectedRoutes.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/authors/:authorId",
        element: <AuthorPage />,
    },
    {
        path: "/documents/:documentId",
        element: <DocumentPage />,
    },
    {
        path: "/authors",
        element: <AuthorsPage />,
    },
    {
        path: "/visualize",
        element: <VisualizePage />,
    },
    {
        path: "/not-found",
        element: <NotFoundPage />,
    },
    {
        path: "/institution-config",
        element: <InstitutionConfigPage />,
    },
    {
        path: "/invitation/:invitationId",
        element: <InvitationRegisterPage />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/admin-panel",
                element: <AdminPanelPage />,
            },
            {
                path: "/projects/:projectId",
                element: <ProjectPage />,
            },
            {
                path: "/projects/:projectId/tasks/:taskId",
                element: <TaskPage />,
            },
            {
                path: "/projects",
                element: <ProjectsPage />,
            },
            {
                path: "/logout",
                element: <LogoutPage />,
            },
        ],
    },
]);
