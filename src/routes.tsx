import {createBrowserRouter} from "react-router-dom";
import {LandingPage} from "./pages/unauthenticated/landing/landingpage.tsx";
import {LoginPage} from "./pages/unauthenticated/login/loginpage.tsx";
import {ProtectedRoutes} from "./components/protectedRoutes.tsx";
import {RegisterPage} from "./pages/unauthenticated/register/registerpage.tsx";
import {DashboardPage} from "./pages/app/dashboard/dashboardpage.tsx";
import {LogoutPage} from "./pages/app/logout/logoutpage.tsx";
import {SettingsPage} from "./pages/app/settings/settingspage.tsx";

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
                path: "/app/logout",
                element: <LogoutPage/>,
            },
        ],

    }
])