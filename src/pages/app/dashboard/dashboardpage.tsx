import {AuthenticatedLayout} from "../../../layouts/authenticatedlayout/authenticatedlayout.tsx";
import React, {useEffect, useState} from "react";
import {UserData} from "../../../data/user.ts";
import {authenticatedClient} from "../../../data/client.ts";
import {getUserInfo} from "../../../data/accesstokenutil.ts";
import {AuthenticatedNavigation} from "../../../components/navigation/authenticated/authenticatednavigation.tsx";

export const DashboardPage = (): React.ReactElement => {

    const [currentUser, setCurrentUser] = useState<UserData>({loadingUser: true, user: undefined});

    const loadCurrentUser = async (): Promise<void> => {
        const resp = await authenticatedClient.get(`/api/users/${getUserInfo().userId}`)
            .then(response => response.data);

        setCurrentUser({loadingUser: false, user: {...resp}});
    }

    useEffect(() => {
        loadCurrentUser()
    }, []);

    return (
        <AuthenticatedLayout>
            <AuthenticatedNavigation user={currentUser.user} loading={currentUser.loadingUser} />
        </AuthenticatedLayout>
    )
}