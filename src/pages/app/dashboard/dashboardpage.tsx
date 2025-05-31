import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import React from "react";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {getUserInfo} from "../../../data/accesstokenutil.ts";

export const DashboardPage = (): React.ReactElement => {

    const {name, userId, institutionId} = getUserInfo();

    return (
        <AuthenticatedLayout>
            <AuthenticatedNavigation />
            <div className="dashboard content" style={{paddingTop: '8%'}}>
                <h2>Welcome, {name}</h2>
            </div>
        </AuthenticatedLayout>
    )
}