import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import React from "react";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import './dashboardpage.css'
import {ProjectsList} from "../../../components/dashboard/projects-list.tsx";
import {StatsGrid} from "../../../components/dashboard/stats-grid.tsx";

export const DashboardPage = (): React.ReactElement => {

    const {name, userId, institutionId} = getUserInfo();

    return (
        <AuthenticatedLayout>
            <AuthenticatedNavigation />
            <div className="dashboard content" style={{paddingTop: '8%'}}>
                <h2>Welcome, {name}</h2>
                <StatsGrid institutionId={institutionId} onError={(error) => console.log(error)} />
                <div className={'projects-grid'}>
                    <img src={'/teaching-image.svg'} className={'projects-grid-image'}></img>
                    <div className={'current-working-projects'}>
                        <h3>Your work</h3>
                        <ProjectsList userId={userId} onError={(error) => console.log(error)} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}