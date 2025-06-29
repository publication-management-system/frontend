import {createBrowserRouter} from "react-router-dom";
import {LandingPage} from "./pages/unauthenticated/landing/landingpage.tsx";
import {LoginPage} from "./pages/unauthenticated/login/loginpage.tsx";
import {ProtectedRoutes} from "./components/protectedRoutes.tsx";
import {RegisterPage} from "./pages/unauthenticated/register/registerpage.tsx";
import {DashboardPage} from "./pages/app/dashboard/dashboardpage.tsx";
import {LogoutPage} from "./pages/app/logout/logoutpage.tsx";
import {SettingsPage} from "./pages/app/settings/settingspage.tsx";
import {InstitutionProfiling} from "./pages/app/institutionprofiling/institutionprofiling.tsx";
import {InstitutionPage} from "./pages/app/institution/institutionpage.tsx";
import {SessionPage} from "./pages/app/session/sessionpage.tsx";
import {ProjectPage} from "./pages/app/projects/projectpage.tsx";
import AcceptInvitationPage from "./pages/unauthenticated/acceptinvitation/acceptinvitationpage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/invitation/:invitationId",
        element: <AcceptInvitationPage />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/app/dashboard',
                element: <DashboardPage/>
            },
            {
                path: '/app/settings',
                element: <SettingsPage/>
            },
            {
                path: '/app/institution-profiling',
                element: <InstitutionProfiling/>
            },
            {
                path:"/app/institution",
                element: <InstitutionPage/>
            },
            {
                path:"/app/institution-profiling/sessions/:sessionId",
                element: <SessionPage/>
            },
            {
                path:"/app/institution-profiling/projects/:projectId",
                element: <ProjectPage/>
            },
            {
                path: "/app/logout",
                element: <LogoutPage/>,
            },
        ],

    }
])