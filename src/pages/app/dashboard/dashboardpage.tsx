import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import React from "react";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";

export const DashboardPage = (): React.ReactElement => {

    return (
        <AuthenticatedLayout>
            <AuthenticatedNavigation />
        </AuthenticatedLayout>
    )
}